import { db } from "../config/db.ts";
import type { PoolClient } from "pg";

import { randomBytes, createHash } from "node:crypto";
import { createUser, getUser, userExists } from "../models/userModel.ts";
import { hashPassword, verifyPassword } from "../utils/password.ts";
import { createSession } from "../models/tokenModel.ts";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

async function issueSession(userId: number, client?: PoolClient) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await createSession(userId, tokenHash, expiresAt, client);
  return { token, expiresAt };
}

export async function registerWithSession(
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

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const exist = await userExists(username);

  if (exist) {
    return { status: "already_exist" };
  }

  const hash = await hashPassword(password);

  const { user, session } = await registerWithSession(username, email, hash);

  return { status: "ok", user, session };
};

export const loginUser = async (username: string, password: string) => {
  const user = await getUser(username);

  const valid = await verifyPassword(password, user.password);

  if (!valid) return { status: "wrong_password" };

  const session = await issueSession(user.id);

  return { status: "ok", user, session };
};
