import express, { type Request, type Response, type Router } from "express";

export const documentRouter: Router = express.Router();

documentRouter.get("/", async (req: Request, res: Response) => {
  console.log("Test message");
});
