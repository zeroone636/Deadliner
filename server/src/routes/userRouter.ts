import express, { type Request, type Response, type Router } from "express";
import { createHash, hash, randomBytes } from "node:crypto";
import { createSession } from "../models/tokenModel.ts";
import { isString } from "../middleware/isString.ts";
import { userExists, createUser, getUser } from "../models/userModel.ts";
import { checkExists } from "../middleware/checkExist.ts";
import { hashPassword, verifyPassword } from "../utils/password.ts";
import { registerController } from "../controllers/user.controller.ts";
export const userRouter: Router = express.Router();
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

async function issueSession(userId: number, client?: PoolClient) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await createSession(userId, tokenHash, expiresAt, client);
  return { token, expiresAt };
}

function setSessionCookie(
  res: Response,
  session: { token: string; expiresAt: Date },
) {
  res.cookie("session", session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: session.expiresAt,
  });
}

async function registerWithSession(
  username: string,
  email: string,
  passwordHash: string,
) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const user = await createUser(username, email, passwordHash, client);
    const session = await issueSession(user.id, client);
    await client.query("COMMIT");
    return { user, session };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

interface AuthBody {
  username: string;
  password: string;
}

userRouter.post("/register", registerController);

userRouter.post(
  "/login",
  checkExists,
  async (req: Request<{}, {}, AuthBody>, res: Response) => {
    try {
      if (!isString(req.body, ["username", "password"])) return;
      const { username, password } = req.body;

      const clearUser = username.trim().toLowerCase();

      const user = await getUser(clearUser);

      const valid = await verifyPassword(password, user.password);

      if (!valid) {
        return res.status(401).json({
          success: false,
          message: "Неверный логин или пароль",
        });
      }

      const session = await issueSession(user.id);
      setSessionCookie(res, session);

      res.json({
        success: true,
        message: "Авторизация успешна",
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Ошибка сервера",
      });
    }
  },
);
