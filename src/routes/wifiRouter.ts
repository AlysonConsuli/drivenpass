import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { createWifi } from "../controllers/wifiController.js";
import { wifiSchema } from "../schemas/wifiSchema.js";

const wifiRouter = Router();
wifiRouter.use(validateToken);
wifiRouter.post("/create-wifi", validateSchema(wifiSchema), createWifi);
export default wifiRouter;
