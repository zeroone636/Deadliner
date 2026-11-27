import { isString } from "../middleware/isString.ts";
import { loginUser, registerUser } from "../services/auth.service.ts";
import { verifyEmail } from "../utils/email.ts";
import { type CookieOptions, type Request, type Response } from "express";

const COOKIE_TEMPLATE: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const registerController = async (req: Request, res: Response) => {
  try {
    if (!isString(req.body, ["username", "email", "password"])) {
      return res.status(400).json({
        success: false,
        message: "Некорректный формат данных",
      });
    }

    const { username, email, password } = req.body;

    const clearUser = username.trim().toLowerCase();
    const clearEmail = email.trim().toLowerCase();

    if (!clearUser || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Введите логин и пароль",
      });
    } else if (!verifyEmail(clearEmail)) {
      return res.status(400).json({
        success: false,
        message: "Некорректный email",
      });
    } else if (
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

    const result = await registerUser(clearUser, clearEmail, password);

    switch (result?.status) {
      case "already_exist":
        return res.status(409).json({
          success: false,
          message: "Пользователь уже существует",
        });
        break;
      case "ok":
        res.cookie("session", result.session?.token, {
          ...COOKIE_TEMPLATE,
          expires: result.session?.expiresAt,
        });
        return res.status(201).json({
          success: true,
          message: "Регистрация прошла успешно!",
          user: result.user,
        });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    if (!isString(req.body, ["username", "password"])) {
      return res.status(400).json({
        success: false,
        message: "Некорректный формат данных",
      });
    }

    const { username, password } = req.body;

    const clearUser = username.trim().toLowerCase();

    if (!clearUser || !password) {
      return res.status(400).json({
        success: false,
        message: "Введите логин и пароль",
      });
    } else if (
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

    const result = await loginUser(clearUser, password);

    switch (result?.status) {
      case "wrong_password":
        return res.status(401).json({
          success: false,
          message: "Неверный логин или пароль",
        });
        break;
      case "ok":
        res.cookie("session", result.session?.token, {
          ...COOKIE_TEMPLATE,
          expires: result.session?.expiresAt,
        });
        return res.json({
          success: true,
          message: "Авторизация прошла успешно",
          user: {
            id: result.user?.id,
            username: result.user?.username,
          },
        });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
    });
  }
};
