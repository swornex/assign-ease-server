import { Request, Response, NextFunction } from "express";
import loggerWithNameSpace from "../utils/logger";

const loggerFn = loggerWithNameSpace("Logger");

/**
 * Logs information about the request method and path.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call.
 * @return {void} This function does not return anything.
 */
export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  loggerFn.info(`${req.method}: ${req.path}`);

  next();
};
