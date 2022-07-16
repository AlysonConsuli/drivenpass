import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { createCard } from "../controllers/cardsController.js";
import { cardSchema } from "../schemas/cardsSchema.js";

const cardRouter = Router();
cardRouter.use(validateToken);
cardRouter.post("/create-card", validateSchema(cardSchema), createCard);
export default cardRouter;
