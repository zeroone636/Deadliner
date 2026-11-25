import { type Request, type Response, type NextFunction } from "express";
import { userExists } from "../models/userModel.ts";

export const checkExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username } = req.body;

  const clearUser = username.trim().toLowerCase();
  const exists = await userExists(clearUser);

  if (!exists) {
    return res.status(401).json({
      success: false,
      message: "Неверный логин или пароль",
    });
  }

  next();
};
