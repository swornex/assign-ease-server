import { Request, Response, NextFunction } from "express";

import * as userServices from "./../services/users";
import { IPagination } from "../interfaces/pagination";
import UnauthenticatedError from "../errors/unauthenticatedError";

/**
 * Retrieves all users from the database and sends a JSON response
 * containing the user data and pagination information.
 *
 * @param {Request<{}, {}, {}, IPagination>} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the response is sent.
 */
export const getAllUsers = async (
  req: Request<{}, {}, {}, IPagination>,
  res: Response
) => {
  const { query } = req;
  const { data, meta } = await userServices.getAllUsers(query);
  res.json({ data, meta });
};

/**
 * Retrieves a user by their ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await userServices.getUserById(+id);
    res.json({ data });
  } catch (e) {
    next(e);
  }
};

/**
 * Create a new user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} Returns a Promise that resolves to void.
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const createdBy = req.user.id;
    const data = await userServices.createUser({ ...req.body, createdBy });
    res.json({ data });
  } catch (e: unknown) {
    next(e);
  }
};

/**
 * Deletes a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Promise<void>} A promise that resolves with no value.
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await userServices.deleteUser(+id);
    res.json({ message: data });
  } catch (e) {
    next(e);
  }
};
