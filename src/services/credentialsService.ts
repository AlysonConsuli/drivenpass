import Cryptr from "cryptr";

import * as credentialsRepository from "../repositories/credentialsRepository.js";
import { Credentials } from "@prisma/client";
import { conflictError } from "../middlewares/handleErrorsMiddleware.js";

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
