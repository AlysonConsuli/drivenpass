import Joi from "joi";

import { NoteInsertData } from "../services/notesService.js";

export const noteSchema = Joi.object<NoteInsertData>({
  title: Joi.string().max(50).required(),
  note: Joi.string().max(1000).required(),
});
