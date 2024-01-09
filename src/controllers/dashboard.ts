import { NextFunction, Request, Response } from "express";

import * as dashboardServices from "../services/dashboard";
import UnauthenticatedError from "../errors/unauthenticatedError";

export const dashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const role = req.user.role;
    const userId = req.user.id;
    const data = await dashboardServices.dashboard(role, +userId);
    res.json({ data });
  } catch (e) {
    next(e);
  }
};
