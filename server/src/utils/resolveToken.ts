import { Response } from "express";
import jws from "jsonwebtoken";

export const createToken = (
  payload: {},
  sect: string,
  exp: number | string
) => {
  const token = jws.sign(payload, sect, { expiresIn: exp });
  return token;
};

export const checkToken = (token: string, sect: string) => {
  try {
    const isVerfied = jws.verify(token, sect);
    if (!isVerfied) {
      return false;
    }
    return isVerfied;
  } catch (error) {
    return false;
  }
};
