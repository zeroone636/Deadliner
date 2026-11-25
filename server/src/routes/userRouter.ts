import express, { type Request, type Response, type Router } from "express";
import { createHash, randomBytes } from "node:crypto";
import { createSession } from "../models/tokenModel.ts";
import bcrypt from "bcrypt";
import { isString } from "../middleware/isString.ts";
import { userExists, createUser, getUser } from "../models/userModel.ts";
import { checkExists } from "../middleware/checkExist.ts";
export const userRouter: Router = express.Router();
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

const EMAIL_PATTERN =
  /^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

interface AuthBody {
  username: string;
  password: string;
}

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

userRouter.post(
  "/register",
  isString(["username", "email", "password"]),
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    try {
      const { username, email, password } = req.body;

      const clearUser = username.trim().toLowerCase();
      const clearEmail = email.trim();

      if (!EMAIL_PATTERN.test(clearEmail)) {
        return res.status(400).json({
          success: false,
          message: "Некорректный email",
        });
      }

      if (
        clearUser.length < 3 ||
        clearUser.length > 50 ||
        password.length < 8 ||
        password.length > 72
      ) {
        return res.status(400).json({
          success: false,
          message: "Неккоректные данные",
        });
      }

      const exist = await userExists(clearUser);

      if (exist) {
        return res.status(409).json({
          success: false,
          message: "Пользователь уже существует",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const createdUser = await createUser(clearUser, clearEmail, hash);

      res.status(201).json({
        success: true,
        message: "Регистрация прошла успешно!",
        user: createdUser,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Ошибка сервера",
      });
    }
  },
);

userRouter.post(
  "/login",
  isString(["username", "password"]),
  checkExists,
  async (req: Request<{}, {}, AuthBody>, res: Response) => {
    try {
      const { username, password } = req.body;

      const clearUser = username.trim().toLowerCase();

      if (!clearUser || !password) {
        return res.status(400).json({
          success: false,
          message: "Введите логин и пароль",
        });
      }

      const user = await getUser(clearUser);

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({
          success: false,
          message: "Неверный логин или пароль",
        });
      }

      const token = randomBytes(32).toString("hex");
      const tokenHash = createHash("sha256").update(token).digest("hex");
      const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

      await createSession(user.id, tokenHash, expiresAt);

      res.cookie("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
      });

      res.json({
        success: true,
        message: "Авторизация успешна",
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Ошибка сервера",
      });
    }
  },
);
