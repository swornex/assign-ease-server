import { NextFunction, Request, Response } from "express";

import * as authServices from "../services/auth";

/**
 * A function that handles the login request.
 *
 * @param {Request} req - the request object containing the login details
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function to be called in the middleware chain
 * @return {Promise<void>} - a promise that resolves to void
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await authServices.login(email, password);
    res.json({ data });
  } catch (e) {
    next(e);
  }
};
