import { NextFunction, Request, Response } from "express";

import * as authServices from "../services/auth";
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await authServices.login(email, password);
    res.json({ data });
  } catch (e) {
    next(e);
  }
};
