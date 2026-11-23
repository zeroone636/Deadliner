import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.ts";
import { documentRouter } from "./routes/documentRouter.ts";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/documents", documentRouter);

app.listen(PORT, () => {
  console.log(`Start server on: http://localhost:${PORT}`);
});
