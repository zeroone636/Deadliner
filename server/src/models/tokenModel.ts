import { db } from "../config/db.ts";
import type { PoolClient } from "pg";

export async function createSession(
  userId: number,
  tokenHash: string,
  expiresAt: Date,
  client: Pick<PoolClient, "query"> = db,
): Promise<void> {
  await client.query(
    "INSERT INTO user_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [userId, tokenHash, expiresAt],
  );
}

export async function findSessionUser(tokenHash: string) {
  const result = await db.query<{ id: number; username: string }>(
    `SELECT u.id, u.username
     FROM user_tokens AS t
     JOIN users AS u ON u.id = t.user_id
     WHERE t.token_hash = $1 AND t.expires_at > NOW()`,
    [tokenHash],
  );
  return result.rows[0] ?? null;
}

export async function deleteSession(tokenHash: string): Promise<void> {
  await db.query(
    "DELETE FROM user_tokens WHERE token_hash = $1",
    [tokenHash]
  );
}