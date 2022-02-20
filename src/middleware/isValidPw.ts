import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const validRtPW = (req: Request, res: Response, next: NextFunction) => {
  const { rpm_id } = req.cookies;
  if (!rpm_id) {
    return res.sendStatus(403);
  }

  const payload = jwt.verify(rpm_id, process.env.ML_SECT!);

  if (!payload) {
    return res.sendStatus(403);
  }

  return next();
};
