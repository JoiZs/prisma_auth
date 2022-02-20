import { NextFunction, Request, Response } from "express";
import { checkToken } from "../utils/resolveToken";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  const { rftk_id } = req.cookies;

  if (!rftk_id) {
    return res.sendStatus(403);
  }

  const userId = checkToken(rftk_id, String(process.env.REF_SECT));

  if (!userId) {
    return res.sendStatus(403);
  }

  //@ts-ignore
  req.userId = userId;
  
 
  return next();
};
