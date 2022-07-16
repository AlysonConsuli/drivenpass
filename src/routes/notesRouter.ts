import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { createNote } from "../controllers/notesController.js";
import { noteSchema } from "../schemas/notesSchema.js";

const noteRouter = Router();
noteRouter.use(validateToken);
noteRouter.post("/create-note", validateSchema(noteSchema), createNote);
export default noteRouter;
