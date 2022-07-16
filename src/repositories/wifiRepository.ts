import prisma from "../config/db.js";

import { WifiInsertData } from "../services/wifiService.js";

export const insertWifi = async (wifiData: WifiInsertData) => {
  await prisma.wifi.create({
    data: wifiData,
  });
};

export const findWifiByUserId = async (userId: number) => {
  const wifi = await prisma.wifi.findMany({
    where: {
      userId,
    },
  });
  return wifi;
};

export const findWifiById = async (wifiId: number) => {
  const wifi = await prisma.wifi.findUnique({
    where: {
      id: wifiId,
    },
  });
  return wifi;
};

export const deleteWifiById = async (wifiId: number) => {
  await prisma.wifi.delete({
    where: {
      id: wifiId,
    },
  });
};
