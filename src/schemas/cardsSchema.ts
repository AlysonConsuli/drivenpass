import Joi from "joi";
import { CardType } from "@prisma/client";
import { CardInsertData } from "../services/cardsService.js";

export const cardSchema = Joi.object<CardInsertData>({
  title: Joi.string().required(),
  number: Joi.string().required(),
  cardName: Joi.string().required(),
  cvv: Joi.string().required(),
  expirationDate: Joi.string().required(),
  password: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(CardType)),
});
