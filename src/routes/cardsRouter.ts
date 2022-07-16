import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import {
  createCard,
  deleteCard,
  getCardById,
  getCards,
} from "../controllers/cardsController.js";
import { cardSchema } from "../schemas/cardsSchema.js";

const cardRouter = Router();
cardRouter.use(validateToken);
cardRouter.post("/create-card", validateSchema(cardSchema), createCard);
cardRouter.get("/cards", getCards);
cardRouter.get("/cards/:id", getCardById);
cardRouter.delete("/cards/:id", deleteCard);

export default cardRouter;
