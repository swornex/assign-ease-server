import { NextFunction, Request, Response } from "express";

import * as dashboardServices from "../services/dashboard";
import UnauthenticatedError from "../errors/unauthenticatedError";
import { IPagination } from "../interfaces/pagination";

export const dashboard = async (
  req: Request<{}, {}, {}, IPagination>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const role = req.user.role;
    const userId = req.user.id;
    const { query } = req;
    const { data, meta } = await dashboardServices.dashboard(
      role,
      +userId,
      query
    );
    res.json({ data, meta });
  } catch (e) {
    next(e);
  }
};
