import { NextFunction, Request, Response } from "express";

import * as dashboardServices from "../services/dashboard";
import UnauthenticatedError from "../errors/unauthenticatedError";
import { IPagination } from "../interfaces/pagination";

/**
 * Executes the dashboard function.
 *
 * @param {Request<{}, {}, {}, IPagination>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} Returns a promise with no return value.
 */
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
