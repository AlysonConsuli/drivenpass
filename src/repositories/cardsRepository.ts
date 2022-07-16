import prisma from "../config/db.js";

import { CardInsertData } from "../services/cardsService.js";

export const findCardByTitle = async (userId: number, title: string) => {
  const titles = await prisma.cards.findFirst({
    where: {
      userId,
      title,
    },
  });
  return titles;
};

export const insertCard = async (cardData: CardInsertData) => {
  await prisma.cards.create({
    data: cardData,
  });
};

export const findCardsByUserId = async (userId: number) => {
  const cards = await prisma.cards.findMany({
    where: {
      userId,
    },
  });
  return cards;
};

export const findCardById = async (cardId: number) => {
  const card = await prisma.cards.findUnique({
    where: {
      id: cardId,
    },
  });
  return card;
};

export const deleteCardById = async (cardId: number) => {
  await prisma.cards.delete({
    where: {
      id: cardId,
    },
  });
};
