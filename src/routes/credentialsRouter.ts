import { Router } from "express";

import {
  createCredential,
  getCredentials,
  getCredentialById,
  deleteCredential,
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
credentialRouter.delete("/credentials/:id", validateToken, deleteCredential);
export default credentialRouter;
