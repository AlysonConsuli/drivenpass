import { Request, Response } from "express";

import * as credentialsService from "../services/credentialsService.js";
import { CredentialInsertData } from "../services/credentialsService.js";

export const createCredential = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const credentialData: CredentialInsertData = req.body;
  await credentialsService.createCredential({ userId, ...credentialData });
  res.sendStatus(201);
};
