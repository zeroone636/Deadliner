import { userRouter } from "./routes/userRouter.ts";
import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Start server on: http://localhost:${PORT}`);
});
