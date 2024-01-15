import { NextFunction, Request, Response } from "express";

import * as userAssignmentStatusServices from "./../services/userAssignmentStatus";
import { IUserAssignmentStatus } from "../interfaces/userAssignmentStatus";
import UnauthenticatedError from "../errors/unauthenticatedError";

/**
 * Retrieves user assignment status by assignment ID.
 *
 * @param {Request<{}, {}, {}, IUserAssignmentStatus>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} Promise that resolves with the user assignment status.
 */
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
