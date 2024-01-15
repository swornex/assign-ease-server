import { NextFunction, Request, Response } from "express";
import * as assignmentServices from "../services/assignments";
import UnauthenticatedError from "../errors/unauthenticatedError";
import { IPagination } from "../interfaces/pagination";

/**
 * Adds a new assignment.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns - A JSON response containing the created assignment data.
 * @throws - UnauthenticatedError if the user is not authenticated.
 */
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

/**
 * Fetches a list of assignments.
 *
 * @param req - The Express request object, including pagination query parameters.
 * @param res - The Express response object.
 * @returns - A JSON response containing the assignments data and pagination metadata.
 */
export const getAssignments = async (
  req: Request<{}, {}, {}, IPagination>,
  res: Response
) => {
  const { query } = req;
  const { data, meta } = await assignmentServices.getAssignments(query);

  res.json({ data, meta });
};

/**
 * Fetches a single assignment by its ID.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A JSON response containing the assignment data.
 */
export const getAssignmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await assignmentServices.getAssignmentById(+id);

  res.json({ data });
};

/**
 * Updates an existing assignment.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns - A JSON response containing the updated assignment data.
 * @throws - UnauthenticatedError if the user is not authenticated.
 */
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
    const data = await assignmentServices.updateAssignment(+params.id, {
      ...body,
      updatedBy
    });

    res.json({ data });
  } catch (e) {
    next(e);
  }
};
