import { isString } from "../middleware/isString.ts";
import { loginUser, registerUser, getSessionUser, revokeSession } from "../services/auth.service.ts";
import { verifyEmail } from "../utils/email.ts";
import { type CookieOptions, type Request, type Response } from "express";

const COOKIE_TEMPLATE: CookieOptions = {
  path: "/",
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

export const meController = async (req: Request, res: Response) => {
  res.set("Cache-Control", "no-store");

  const token = req.cookies.session;
  const user = typeof token === "string" && token ? await getSessionUser(token) : null;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Пользователь не авторизован",
    });
  }

  return res.json({
    success: true,
    user,
  });
}

export const logoutController = async (req: Request, res: Response) => {
  const token = req.cookies.session;

  if (typeof token === "string" && token) {
    await revokeSession(token);
  }

  res.clearCookie("session", COOKIE_TEMPLATE);

  return res.status(200).json({
    success: true,
    message: "Вы успешно вышли из аккаунта",
  });
}