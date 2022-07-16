import { Cards, CardType } from "@prisma/client";

export type CardInsertData = Omit<Cards, "id" | "createdAt">;

export const createCard = async (cardData: CardInsertData) => {};
