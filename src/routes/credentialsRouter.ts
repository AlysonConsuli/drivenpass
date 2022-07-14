import { Router } from "express";

import { createCredential } from "../controllers/credentialsController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { credentialSchema } from "../schemas/credentialsSchema.js";

const credentialRouter = Router();
credentialRouter.post(
  "/create-credential",
  validateSchema(credentialSchema),
  createCredential
);
export default credentialRouter;
