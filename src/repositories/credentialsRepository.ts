import prisma from "../config/db.js";

import { CredentialInsertData } from "../services/credentialsService.js";

export const findCredentialByTitle = async (userId: number, title: string) => {
  const titles = await prisma.credentials.findFirst({
    where: {
      userId,
      title,
    },
  });
  return titles;
};

export const insertCredential = async (
  credentialData: CredentialInsertData
) => {
  await prisma.credentials.create({
    data: credentialData,
  });
};

export const findCredentialsByUserId = async (userId: number) => {
  const credentials = await prisma.credentials.findMany({
    where: {
      userId,
    },
  });
  return credentials;
};

export const findCredentialById = async (credentialId: number) => {
  const credential = await prisma.credentials.findUnique({
    where: {
      id: credentialId,
    },
  });
  return credential;
};
