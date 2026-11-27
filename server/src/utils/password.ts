import bcrypt from "bcrypt";

const BCRYPT_SALT = 10;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, BCRYPT_SALT);
};

export const verifyPassword = (password: string, passwordHash: string) => {
  return bcrypt.compare(password, passwordHash);
};
