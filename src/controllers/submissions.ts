import { NextFunction, Request, Response } from "express";
import * as submissionServices from "../services/submissions";
import UnauthenticatedError from "../errors/unauthenticatedError";

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

    const { body, params } = req;

    const data = await submissionServices.submitAssignment({
      ...body,
      assignmentId: params.assignmentId,
      submittedBy
    });
    res.json({ data });
  } catch (e) {
    next(e);
  }
};