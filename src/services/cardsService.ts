import Cryptr from "cryptr";
import { Cards, CardType } from "@prisma/client";

import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as cardsRepository from "../repositories/cardsRepository.js";
import * as categoryUtils from "../utils/categoryUtils.js";

export type CardInsertData = Omit<Cards, "id" | "createdAt">;

export const createCard = async (cardData: CardInsertData) => {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const { userId, title, password, cvv } = cardData;
  const titles = await cardsRepository.findCardByTitle(userId, title);
  if (titles) {
    throw conflictError("User already has this title");
  }
  const encryptedPassword: string = cryptr.encrypt(password);
  const encryptedCvv: string = cryptr.encrypt(cvv);
  await cardsRepository.insertCard({
    ...cardData,
    password: encryptedPassword,
    cvv: encryptedCvv,
  });
};

export const getCards = async (userId: number) => {
  const cards = await cardsRepository.findCardsByUserId(userId);
  const cardsDecrypted = categoryUtils.decrypt(cards);
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
  const cardDecrypted = categoryUtils.decrypt([card]);
  return cardDecrypted[0];
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
