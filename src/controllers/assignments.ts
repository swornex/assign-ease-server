import { Request, Response } from "express";
import * as assignmentServices from "../services/assignments";
import UnauthenticatedError from "../errors/unauthenticatedError";

export const addAssignment = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new UnauthenticatedError("Unauthenticated");
  }
  const createdBy = req.user.id;
  const data = await assignmentServices.addAssignments({
    ...req.body,
    createdBy
  });
  res.json({ data });
};
