import { Request, Response } from "express";

import * as cardsService from "../services/cardsService.js";
import { CardInsertData } from "../services/cardsService.js";

export const createCard = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const cardData: CardInsertData = req.body;
  await cardsService.createCard({ userId, ...cardData });
  res.sendStatus(201);
};
