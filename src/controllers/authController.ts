import { Request, Response } from "express";

import * as authService from "../services/authService.js";

export const signup = async (req: Request, res: Response) => {
  await authService.signup();
  res.sendStatus(201);
};
