import Joi from "joi";
import { CredentialInsertData } from "../services/credentialsService.js";

export const credentialSchema = Joi.object<CredentialInsertData>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
