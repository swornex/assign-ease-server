import { NextFunction, Request, Response } from "express";

import * as userAssignmentStatusServices from "./../services/userAssignmentStatus";
import { IUserAssignmentStatus } from "../interfaces/userAssignmentStatus";
import UnauthenticatedError from "../errors/unauthenticatedError";

export const getByAssignmentId = async (
  req: Request<{}, {}, {}, IUserAssignmentStatus>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, assignmentId } = req.query;

    if (!req.user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const data = await userAssignmentStatusServices.getByAssignmentId({
      assignmentId,
      userId: userId || +req.user.id
    });
    res.json({ data });
  } catch (e) {
    next(e);
  }
};
