import Cryptr from "cryptr";

import * as credentialsRepository from "../repositories/credentialsRepository.js";
import { Credentials } from "@prisma/client";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as categoryUtils from "../utils/categoryUtils.js";

export type CredentialInsertData = Omit<Credentials, "id" | "createdAt">;

export const createCredential = async (
  credentialData: CredentialInsertData
) => {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const { userId, title, password } = credentialData;
  const titles = await credentialsRepository.findCredentialByTitle(
    userId,
    title
  );
  if (titles) {
    throw conflictError("User already has this title");
  }
  const encryptedPasswrod: string = cryptr.encrypt(password);
  await credentialsRepository.insertCredential({
    ...credentialData,
    password: encryptedPasswrod,
  });
};

export const getCredentials = async (userId: number) => {
  const credentials = await credentialsRepository.findCredentialsByUserId(
    userId
  );
  const credentialsDecrypted = categoryUtils.decrypt(credentials);
  return credentialsDecrypted;
};

export const getCredentialById = async (
  userId: number,
  credentialId: number
) => {
  const credential = await credentialsRepository.findCredentialById(
    credentialId
  );
  if (!credential) {
    throw notFoundError("Credential not found");
  }
  if (credential.userId !== userId) {
    throw unauthorizedError("Credential belongs to another user");
  }
  const credentialDecrypted = categoryUtils.decrypt([credential]);
  return credentialDecrypted[0];
};

export const deleteCredential = async (
  userId: number,
  credentialId: number
) => {
  const credential = await credentialsRepository.findCredentialById(
    credentialId
  );
  if (!credential) {
    throw notFoundError("Credential not found");
  }
  if (credential.userId !== userId) {
    throw unauthorizedError("Credential belongs to another user");
  }
  await credentialsRepository.deleteCredentialById(credentialId);
};
