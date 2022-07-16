import { Router } from "express";

import authRouter from "./authRouter.js";
import credentialRouter from "./credentialsRouter.js";
import noteRouter from "./notesRouter.js";

const router = Router();
router.use(authRouter);
router.use(credentialRouter);
router.use(noteRouter);

export default router;
