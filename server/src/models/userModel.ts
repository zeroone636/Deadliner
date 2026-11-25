import { db } from "../config/db.ts";
import type { PoolClient } from "pg";

interface User {
  id: number;
  username: string;
}

interface FullUser {
  id: number;
  username: string;
  password: string;
}

export const userExists = async (login: string): Promise<boolean> => {
  const user = await db.query(
    "SELECT id FROM users WHERE username = $1 OR email = $1",
    [login],
  );

  return Boolean(user.rows[0]);
};

export const createUser = async (
  login: string,
  email: string,
  password: string,
  client: Pick<PoolClient, "query"> = db,
): Promise<User> => {
  const newUser = await client.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username",
    [login, email, password],
  );

  return newUser.rows[0];
};

export const getUser = async (login: string): Promise<FullUser> => {
  const checkUser = await db.query(
    "SELECT id, username, password FROM users WHERE username = $1 OR email = $1",
    [login],
  );

  return checkUser.rows[0];
};
