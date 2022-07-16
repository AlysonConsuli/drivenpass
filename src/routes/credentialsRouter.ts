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
credentialRouter.use(validateToken);
credentialRouter.post(
  "/create-credential",
  validateSchema(credentialSchema),
  createCredential
);
credentialRouter.get("/credentials", getCredentials);
credentialRouter.get("/credentials/:id", getCredentialById);
credentialRouter.delete("/credentials/:id", deleteCredential);

export default credentialRouter;
