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
