import { Router } from "express";

import { signin, signup } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();
authRouter.use(validateSchema(authSchema));
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
export default authRouter;
