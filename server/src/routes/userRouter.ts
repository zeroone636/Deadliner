import express, { type Request, type Response, type Router } from "express";
import { db } from "../config/db.ts";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
export const userRouter: Router = express.Router();

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

      const check = await db.query("SELECT id FROM users WHERE username = $1", [
        clearUser,
      ]);

      if (check.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Пользователь уже существует",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        clearUser,
        hash,
      ]);

      res.status(201).json({
        success: true,
        message: "Регистрация прошла успешно!",
        user: clearUser,
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

      const result = await db.query("SELECT * FROM users WHERE username = $1", [
        clearUser,
      ]);

      if (!clearUser || !password) {
        return res.status(400).json({
          success: false,
          message: "Введите логин и пароль",
        });
      }

      if (result.rows.length === 0) {
        return res.status(401).json({
          message: "Неверный логин или пароль",
        });
      }

      const user = result.rows[0];

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({
          message: "Неверный логин или пароль",
        });
      }

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
