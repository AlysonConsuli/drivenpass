import { Notes } from "@prisma/client";

export type NoteInsertData = Omit<Notes, "id" | "createdAt">;

export const createNote = async (noteData: NoteInsertData) => {};
