import { Request, Response } from "express";

import * as cardsService from "../services/cardsService.js";
import { CardInsertData } from "../services/cardsService.js";

export const createCard = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const cardData: CardInsertData = req.body;
  await cardsService.createCard({ userId, ...cardData });
  res.sendStatus(201);
};

export const getCards = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const cards = await cardsService.getCards(userId);
  res.send(cards);
};

export const getCardById = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const cardId = parseInt(req.params.id);
  const card = await cardsService.getCardById(userId, cardId);
  res.send(card);
};

export const deleteCard = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const cardId = parseInt(req.params.id);
  await cardsService.deleteCard(userId, cardId);
  res.sendStatus(204);
};
