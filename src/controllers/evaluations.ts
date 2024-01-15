import { NextFunction, Request, Response } from "express";

import * as evaluationServices from "../services/evaluations";
import UnauthenticatedError from "../errors/unauthenticatedError";

/**
 * Evaluates an assignment.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} - a promise that resolves to void
 */
export const evaluateAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const evaluatedBy = req.user.id;
    const { body } = req;
    const data = await evaluationServices.evaluateAssignment({
      ...body,

      evaluatedBy
    });
    res.json({ data });
  } catch (e) {
    next(e);
  }
};
