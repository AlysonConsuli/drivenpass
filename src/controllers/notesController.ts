import { Request, Response } from "express";

import * as notesService from "../services/notesService.js";
import { NoteInsertData } from "../services/notesService.js";

export const createNote = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const noteData: NoteInsertData = req.body;
  await notesService.createNote({ userId, ...noteData });
  res.sendStatus(201);
};

export const getNotes = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const notes = await notesService.getNotes(userId);
  res.send(notes);
};

export const getnoteById = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const noteId = parseInt(req.params.id);
  const note = await notesService.getNoteById(userId, noteId);
  res.send(note);
};

export const deletenote = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const noteId = parseInt(req.params.id);
  await notesService.deleteNote(userId, noteId);
  res.sendStatus(204);
};
