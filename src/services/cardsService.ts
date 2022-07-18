import { Cards } from "@prisma/client";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as cardsRepository from "../repositories/cardsRepository.js";
import { encrypt, decrypt } from "../utils/categoryUtils.js";

export type CardInsertData = Omit<Cards, "id" | "createdAt">;

export const createCard = async (cardData: CardInsertData) => {
  const { userId, title, password, cvv } = cardData;
  const titles = await cardsRepository.findCardByTitle(userId, title);
  if (titles) {
    throw conflictError("User already has this title");
  }
  const encryptedPassword: string = encrypt(password);
  const encryptedCvv: string = encrypt(cvv);
  await cardsRepository.insertCard({
    ...cardData,
    password: encryptedPassword,
    cvv: encryptedCvv,
  });
};

export const getCards = async (userId: number) => {
  const cards = await cardsRepository.findCardsByUserId(userId);
  const cardsDecrypted = cards.map((card) => {
    const decryptedPassword: string = decrypt(card.password);
    const decryptedCvv: string = decrypt(card.cvv);
    return { ...card, password: decryptedPassword, cvv: decryptedCvv };
  });
  return cardsDecrypted;
};

export const getCardById = async (userId: number, cardId: number) => {
  const card = await cardsRepository.findCardById(cardId);
  if (!card) {
    throw notFoundError("Card not found");
  }
  if (card.userId !== userId) {
    throw unauthorizedError("Card belongs to another user");
  }
  const decryptedPassword: string = decrypt(card.password);
  const decryptedCvv: string = decrypt(card.cvv);
  return { ...card, password: decryptedPassword, cvv: decryptedCvv };
};

export const deleteCard = async (userId: number, cardId: number) => {
  const card = await cardsRepository.findCardById(cardId);
  if (!card) {
    throw notFoundError("Card not found");
  }
  if (card.userId !== userId) {
    throw unauthorizedError("Card belongs to another user");
  }
  await cardsRepository.deleteCardById(cardId);
};
