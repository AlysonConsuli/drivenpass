import { Request, Response } from "express";

import * as credentialsService from "../services/credentialsService.js";
import { CredentialInsertData } from "../services/credentialsService.js";

export const createCredential = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const credentialData: CredentialInsertData = req.body;
  await credentialsService.createCredential({ userId, ...credentialData });
  res.sendStatus(201);
};

export const getCredentials = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const credentials = await credentialsService.getCredentials(userId);
  res.send(credentials);
};

export const getCredentialById = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const credentialId = parseInt(req.params.id);
  const credential = await credentialsService.getCredentialById(
    userId,
    credentialId
  );
  res.send(credential);
};
