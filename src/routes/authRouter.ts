import { Router } from "express";

import { signup } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { signupSchema } from "../schemas/authSchema.js";

const authRouter = Router();
authRouter.post("/signup", validateSchema(signupSchema), signup);
export default authRouter;
