import { NextFunction, Request, Response } from "express";
import * as assignmentServices from "../services/assignments";
import UnauthenticatedError from "../errors/unauthenticatedError";

export const addAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new UnauthenticatedError("Unauthenticated");
    }
    const createdBy = req.user.id;
    const data = await assignmentServices.addAssignments({
      ...req.body,
      createdBy
    });
    res.json({ data });
  } catch (e) {
    next(e);
  }
};

export const getAssignments = async (_req: Request, res: Response) => {
  const data = await assignmentServices.getAssignments();
  res.json({ data });
};

export const getAssignmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await assignmentServices.getAssignmentById(id);
  res.json({ data });
};

export const updateAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, params } = req;

    if (!req.user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const updatedBy = req.user.id;
    const data = await assignmentServices.updateAssignment(params.id, {
      ...body,
      updatedBy
    });
    res.json({ data });
  } catch (e) {
    next(e);
  }
};
