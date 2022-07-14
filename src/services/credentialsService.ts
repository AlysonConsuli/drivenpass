import * as credentialsRepository from "../repositories/credentialsRepository.js";

export const createCredential = async (credentialData) => {
  await credentialsRepository.insertCredential(credentialData);
};
