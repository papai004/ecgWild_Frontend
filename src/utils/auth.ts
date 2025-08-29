
import CryptoJS from "crypto-js";

const HASHED_PASSWORD = "4d6d1e34e3987dbc8bad6110bc31ef0d886c3b51b161276dc5754b9376f39cd4";

export const verifyPassword = (input: string): boolean => {
  const inputHash = CryptoJS.SHA256(input).toString();
  return inputHash === HASHED_PASSWORD;
};
