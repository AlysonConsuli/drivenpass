import Cryptr from "cryptr";

export const decrypt = (arr: { password: string }[]) => {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const arrDecrypted = arr.map((obj) => {
    const decryptedPassword: string = cryptr.decrypt(obj.password);
    return { ...obj, password: decryptedPassword };
  });
  return arrDecrypted;
};
