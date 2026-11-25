import { db } from "../config/db.ts";

export async function createSession(
  userId: number,
  tokenHash: string,
  expiresAt: Date,
): Promise<void> {
  await db.query(
    "INSERT INTO user_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [userId, tokenHash, expiresAt],
  );
}
