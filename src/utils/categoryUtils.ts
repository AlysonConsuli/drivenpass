import Cryptr from "cryptr";

export const decrypt = (arr: { password: string; cvv?: string }[]) => {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const arrDecrypted = arr.map((obj) => {
    const decryptedPassword: string = cryptr.decrypt(obj.password);
    if (!obj?.cvv) {
      return { ...obj, password: decryptedPassword };
    }
    const decryptedCvv: string = cryptr.decrypt(obj.cvv);
    return { ...obj, password: decryptedPassword, cvv: decryptedCvv };
  });
  return arrDecrypted;
};
