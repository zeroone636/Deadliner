import { db } from "./config/db.ts";
import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const PORT = 8000;

app.get("/api", (req: Request, res: Response) => {
  res.json({
    message: "Hello world!",
  });
});

app.listen(PORT, () => {
  console.log(`Start server on: http://localhost:${PORT}`);
});
