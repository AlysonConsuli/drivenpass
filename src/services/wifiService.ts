import { Wifi } from "@prisma/client";

export type WifiInsertData = Omit<Wifi, "id" | "createdAt">;

export const createWifi = async (wifiData: WifiInsertData) => {};
