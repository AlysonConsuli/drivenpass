import { Request, Response } from "express";

import * as wifiService from "../services/wifiService.js";
import { WifiInsertData } from "../services/wifiService.js";

export const createWifi = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const wifiData: WifiInsertData = req.body;
  await wifiService.createWifi({ userId, ...wifiData });
  res.sendStatus(201);
};
