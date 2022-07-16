import Joi from "joi";
import { WifiInsertData } from "../services/wifiService.js";

export const wifiSchema = Joi.object<WifiInsertData>({
  title: Joi.string().required(),
  wifiName: Joi.string().required(),
  password: Joi.string().required(),
});
