import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "../config/setup.js";

import { unauthorizedError } from "./handleErrorsMiddleware.js";
import * as authRepository from "../repositories/authRepository.js";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) {
    throw unauthorizedError(
      "You must pass an authorization token in the request header!"
    );
  }
  const secretKey = process.env.JWT_SECRET_KEY;
  try {
    const data: authRepository.User = jwt.verify(token, secretKey);
    res.locals.user = data;
  } catch {
    throw unauthorizedError("Invalid token!");
  }
  next();
};
