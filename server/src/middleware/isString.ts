import { type Request, type Response, type NextFunction } from "express";

export const isString = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const allStrings = fields.every((field) => {
      return typeof req.body?.[field] === "string";
    });

    if (!allStrings) {
      return res.status(400).json({
        success: false,
        message: "Некорректные данные",
      });
    }

    next();
  };
};
