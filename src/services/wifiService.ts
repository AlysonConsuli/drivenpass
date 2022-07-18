import * as wifiRepository from "../repositories/wifiRepository.js";
import { Wifi } from "@prisma/client";
import {
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import { encrypt, decrypt } from "../utils/categoryUtils.js";

export type WifiInsertData = Omit<Wifi, "id" | "createdAt">;

export const createWifi = async (wifiData: WifiInsertData) => {
  const { password } = wifiData;
  const encryptedPassword: string = encrypt(password);
  await wifiRepository.insertWifi({
    ...wifiData,
    password: encryptedPassword,
  });
};

export const getWifi = async (userId: number) => {
  const wifi = await wifiRepository.findWifiByUserId(userId);
  const wifiDecrypted = wifi.map((wifiObj) => {
    const decryptedPassword: string = decrypt(wifiObj.password);
    return { ...wifiObj, password: decryptedPassword };
  });
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
  const decryptedPassword: string = decrypt(wifi.password);
  return { ...wifi, password: decryptedPassword };
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
