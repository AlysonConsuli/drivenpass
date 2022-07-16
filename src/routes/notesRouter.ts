import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import {
  createNote,
  deletenote,
  getnoteById,
  getNotes,
} from "../controllers/notesController.js";
import { noteSchema } from "../schemas/notesSchema.js";

const noteRouter = Router();
noteRouter.use(validateToken);
noteRouter.post("/create-note", validateSchema(noteSchema), createNote);
noteRouter.get("/notes", getNotes);
noteRouter.get("/notes/:id", getnoteById);
noteRouter.delete("/notes/:id", deletenote);

export default noteRouter;
