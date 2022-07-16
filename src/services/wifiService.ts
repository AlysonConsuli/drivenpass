import Cryptr from "cryptr";

import * as wifiRepository from "../repositories/wifiRepository.js";
import { Wifi } from "@prisma/client";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as categoryUtils from "../utils/categoryUtils.js";

export type WifiInsertData = Omit<Wifi, "id" | "createdAt">;

export const createWifi = async (wifiData: WifiInsertData) => {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const { password } = wifiData;
  const encryptedPassword: string = cryptr.encrypt(password);
  await wifiRepository.insertWifi({
    ...wifiData,
    password: encryptedPassword,
  });
};

export const getWifi = async (userId: number) => {
  const wifi = await wifiRepository.findWifiByUserId(userId);
  const wifiDecrypted = categoryUtils.decrypt(wifi);
  return wifiDecrypted;
};

export const getWifiById = async (userId: number, wifiId: number) => {
  const wifi = await wifiRepository.findWifiById(wifiId);
  if (!wifi) {
    throw notFoundError("Wifi not found");
  }
  if (wifi.userId !== userId) {
    throw unauthorizedError("Wifi belongs to another user");
  }
  const wifiDecrypted = categoryUtils.decrypt([wifi]);
  return wifiDecrypted[0];
};

export const deleteWifi = async (userId: number, wifiId: number) => {
  const wifi = await wifiRepository.findWifiById(wifiId);
  if (!wifi) {
    throw notFoundError("Wifi not found");
  }
  if (wifi.userId !== userId) {
    throw unauthorizedError("Wifi belongs to another user");
  }
  await wifiRepository.deleteWifiById(wifiId);
};
