import express, { type Request, type Response, type Router } from "express";
import { createHash, randomBytes } from "node:crypto";
import { createSession } from "../models/tokenModel.ts";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { checkUserExists, createUser, getUser } from "../models/userModel.ts";
export const userRouter: Router = express.Router();
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

dotenv.config();

userRouter.use(express.json());

interface AuthBody {
  username: string;
  password: string;
}

userRouter.post(
  "/register",
  async (req: Request<{}, {}, AuthBody>, res: Response) => {
    try {
      const { username, password } = req.body;

      if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).json({
          success: false,
          message: "Некорректные данные",
        });
      }

      const clearUser = username.trim();

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

      const exist = await checkUserExists(clearUser);

      if (exist) {
        return res.status(409).json({
          success: false,
          message: "Пользователь уже существует",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const createdUser = await createUser(username, hash);

      res.status(201).json({
        success: true,
        message: "Регистрация прошла успешно!",
        user: createdUser,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Ошибка сервера",
      });
    }
  },
);

userRouter.post(
  "/login",
  async (req: Request<{}, {}, AuthBody>, res: Response) => {
    try {
      const { username, password } = req.body;

      if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).json({
          success: false,
          message: "Неверный логин или пароль",
        });
      }

      const clearUser = username.trim();

      const exist = await checkUserExists(clearUser);

      if (!exist) {
        return res.status(401).json({
          success: false,
          message: "Неверный логин или пароль",
        });
      }

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
        message: "Авторизация успешна",
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Ошибка сервера",
      });
    }
  },
);
