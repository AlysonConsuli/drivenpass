import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../config/setup.js";

import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as authRepository from "../repositories/authRepository.js";

export const signup = async (userData: authRepository.UserInsertData) => {
  const { email, password } = userData;
  const user = await authRepository.findUserByEmail(email);
  if (user) {
    throw conflictError("User already exists!");
  }
  const hashedPassword: string = bcrypt.hashSync(password, 10);
  authRepository.insertUser({ email, password: hashedPassword });
};

export const signin = async (userData: authRepository.UserInsertData) => {
  const { email, password } = userData;
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw notFoundError("User not found!");
  }
  if (!bcrypt.compareSync(password, user?.password)) {
    throw unauthorizedError("Incorrect password!");
  }
  const secretKey = process.env.JWT_SECRET_KEY;
  const token: string = jwt.sign(user, secretKey);
  return token;
};
