import { NextFunction, Request, Response } from "express";

import * as evaluationServices from "../services/evaluations";
import UnauthenticatedError from "../errors/unauthenticatedError";

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
    const { body, params } = req;
    const data = await evaluationServices.evaluateAssignment({
      ...body,
      submissionId: params.submissionId,
      evaluatedBy
    });
    res.json({ data });
  } catch (e) {
    next(e);
  }
};