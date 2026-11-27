import express, { type Request, type Response, type Router } from "express";
import { checkExists } from "../middleware/checkExist.ts";
import {
  loginController,
  registerController,
} from "../controllers/user.controller.ts";
export const userRouter: Router = express.Router();

userRouter.post("/register", registerController);

userRouter.post("/login", checkExists, loginController);
