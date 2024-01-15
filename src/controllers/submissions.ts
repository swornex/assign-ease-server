import { NextFunction, Request, Response } from "express";
import * as submissionServices from "../services/submissions";
import UnauthenticatedError from "../errors/unauthenticatedError";

/**
 * Submits an assignment.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} - a promise that resolves to void
 */
export const submitAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const submittedBy = req.user.id;

    const { body } = req;

    const data = await submissionServices.submitAssignment({
      ...body,
      submittedBy
    });
    res.json({ data });
  } catch (e) {
    next(e);
  }
};
