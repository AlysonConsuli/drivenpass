import { Request, Response } from "express";

import * as authService from "../services/authService.js";

export const signup = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  await authService.signup({ email, password });
  res.sendStatus(201);
};

export const signin = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  const token = await authService.signin({ email, password });
  res.send(token);
};
