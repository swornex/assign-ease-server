import { NextFunction, Request, Response } from "express";
import UnauthenticatedError from "../errors/unauthenticatedError";
import { validateAccessToken } from "../utils/jwt";
import { IRole } from "../interfaces/users";

/**
 * Middleware function to handle access authentication.
 *
 * @param {Request} req - The request object.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void}
 */
export const accessAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    const token = authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthenticatedError("No access token provided");
    }

    const { data: decodedUser } = validateAccessToken(token);

    req.user = decodedUser;

    next();
  } catch (e) {
    next(e);
  }
};

/**
 * Middleware function that checks if the user has the specified role.
 *
 * @param {IRole} role - The role to check against.
 * @return {Function} - The middleware function that performs the role check.
 */
export const roleAuth = (role: IRole) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnauthenticatedError("User is not authenticated");
      }

      const { role: userRole } = req.user;

      if (userRole !== role) {
        throw new UnauthenticatedError("Role not authorized");
      }

      next();
    } catch (e) {
      next(e);
    }
  };
};
