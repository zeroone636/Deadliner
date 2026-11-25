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
