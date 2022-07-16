import { Request, Response } from "express";

import * as notesService from "../services/notesService.js";
import { NoteInsertData } from "../services/notesService.js";

export const createNote = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const noteData: NoteInsertData = req.body;
  await notesService.createNote({ userId, ...noteData });
  res.sendStatus(201);
};
