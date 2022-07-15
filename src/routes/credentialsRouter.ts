import { Router } from "express";

import {
  createCredential,
  getCredentials,
  getCredentialById,
} from "../controllers/credentialsController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { credentialSchema } from "../schemas/credentialsSchema.js";

const credentialRouter = Router();
credentialRouter.post(
  "/create-credential",
  validateToken,
  validateSchema(credentialSchema),
  createCredential
);
credentialRouter.get("/credentials", validateToken, getCredentials);
credentialRouter.get("/credentials/:id", validateToken, getCredentialById);
export default credentialRouter;
