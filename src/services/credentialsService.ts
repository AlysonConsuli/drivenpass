import * as credentialsRepository from "../repositories/credentialsRepository.js";
import { Credentials } from "@prisma/client";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import { encrypt, decrypt } from "../utils/categoryUtils.js";

export type CredentialInsertData = Omit<Credentials, "id" | "createdAt">;

export const createCredential = async (
  credentialData: CredentialInsertData
) => {
  const { userId, title, password } = credentialData;
  const titles = await credentialsRepository.findCredentialByTitle(
    userId,
    title
  );
  if (titles) {
    throw conflictError("User already has this title");
  }
  const encryptedPassword: string = encrypt(password);
  await credentialsRepository.insertCredential({
    ...credentialData,
    password: encryptedPassword,
  });
};

export const getCredentials = async (userId: number) => {
  const credentials = await credentialsRepository.findCredentialsByUserId(
    userId
  );
  const credentialsDecrypted = credentials.map((credential) => {
    const decryptedPassword: string = decrypt(credential.password);
    return { ...credential, password: decryptedPassword };
  });
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
  const decryptedPassword: string = decrypt(credential.password);
  return { ...credential, password: decryptedPassword };
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
