import { db } from "../config/db.ts";

interface User {
  id: number;
  username: string;
}

interface FullUser {
  id: number;
  username: string;
  password: string;
}

export const checkUserExists = async (login: string): Promise<Boolean> => {
  const user = await db.query("SELECT id FROM users WHERE username = $1", [
    login,
  ]);

  return Boolean(user.rows[0]);
};

export const createUser = async (
  login: string,
  password: string,
): Promise<User> => {
  const newUser = await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    [login, password],
  );

  return newUser.rows[0];
};

export const getUser = async (login: string): Promise<FullUser> => {
  const checkUser = await db.query(
    "SELECT id, username, password FROM users WHERE username = $1",
    [login],
  );

  return checkUser.rows[0];
};
