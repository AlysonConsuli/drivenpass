import { Router } from "express";

import authRouter from "./authRouter.js";
import cardRouter from "./cardsRouter.js";
import credentialRouter from "./credentialsRouter.js";
import noteRouter from "./notesRouter.js";

const router = Router();
router.use(authRouter);
router.use(credentialRouter);
router.use(noteRouter);
router.use(cardRouter);

export default router;
