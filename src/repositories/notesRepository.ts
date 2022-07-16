import prisma from "../config/db.js";

import { NoteInsertData } from "../services/notesService.js";

export const findNoteByTitle = async (userId: number, title: string) => {
  const titles = await prisma.notes.findFirst({
    where: {
      userId,
      title,
    },
  });
  return titles;
};

export const insertNote = async (noteData: NoteInsertData) => {
  await prisma.notes.create({
    data: noteData,
  });
};

export const findNotesByUserId = async (userId: number) => {
  const notes = await prisma.notes.findMany({
    where: {
      userId,
    },
  });
  return notes;
};

export const findNoteById = async (noteId: number) => {
  const note = await prisma.notes.findUnique({
    where: {
      id: noteId,
    },
  });
  return note;
};

export const deleteNoteById = async (noteId: number) => {
  await prisma.notes.delete({
    where: {
      id: noteId,
    },
  });
};
