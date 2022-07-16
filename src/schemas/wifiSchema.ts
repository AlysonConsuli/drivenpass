import Joi from "joi";
import { WifiInsertData } from "../services/wifiService.js";

export const wifiSchema = Joi.object<WifiInsertData>({
  wifiName: Joi.string().required(),
  password: Joi.string().required(),
});
