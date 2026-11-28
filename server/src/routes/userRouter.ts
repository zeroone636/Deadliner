import express, { type Request, type Response, type Router } from "express";
import { checkExists } from "../middleware/checkExist.ts";
import {
  loginController,
  registerController,
  meController,
  logoutController
} from "../controllers/user.controller.ts";
export const userRouter: Router = express.Router();

userRouter.post("/register", registerController);

userRouter.get("/me", meController);
userRouter.post("/logout", logoutController);

userRouter.post("/login", checkExists, loginController);
