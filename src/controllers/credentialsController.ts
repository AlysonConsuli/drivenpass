import { Request, Response } from "express";

import * as credentialsService from "../services/credentialsService.js";

export const createCredential = async (req: Request, res: Response) => {
  const credentialData = req.body;
  await credentialsService.createCredential(credentialData);
  res.sendStatus(201);
};
