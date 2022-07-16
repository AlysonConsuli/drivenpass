import { Notes } from "@prisma/client";

import * as notesRepository from "../repositories/notesRepository.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";

export type NoteInsertData = Omit<Notes, "id" | "createdAt">;

export const createNote = async (noteData: NoteInsertData) => {
  const { userId, title } = noteData;
  const titles = await notesRepository.findNoteByTitle(userId, title);
  if (titles) {
    throw conflictError("User already has this title");
  }
  await notesRepository.insertNote(noteData);
};

export const getNotes = async (userId: number) => {
  const notes = await notesRepository.findNotesByUserId(userId);
  return notes;
};

export const getNoteById = async (userId: number, noteId: number) => {
  const note = await notesRepository.findNoteById(noteId);
  if (!note) {
    throw notFoundError("Note not found");
  }
  if (note.userId !== userId) {
    throw unauthorizedError("Note belongs to another user");
  }
  return note;
};

export const deleteNote = async (userId: number, noteId: number) => {
  const note = await notesRepository.findNoteById(noteId);
  if (!note) {
    throw notFoundError("Note not found");
  }
  if (note.userId !== userId) {
    throw unauthorizedError("Note belongs to another user");
  }
  await notesRepository.deleteNoteById(noteId);
};
