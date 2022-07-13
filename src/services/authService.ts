import bcrypt from "bcrypt";

import { conflictError } from "../middlewares/handleErrorsMiddleware.js";
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
