import db from "../config/db.js";

export interface User {
  id: number;
  email: string;
  password: string;
}

export type UserInsertData = Omit<User, "id">;

export const findUserByEmail = async (email: string) => {
  const { rows } = await db.query<User>(
    `SELECT * FROM users 
    WHERE email = $1`,
    [email]
  );
  return rows[0];
};

export const insertUser = async (userData: UserInsertData) => {
  const { email, password } = userData;
  await db.query<UserInsertData>(
    `INSERT INTO users 
    (email, password) 
    VALUES ($1, $2)`,
    [email, password]
  );
};
