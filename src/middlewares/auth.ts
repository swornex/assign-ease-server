import { NextFunction, Request, Response } from "express";
import UnauthenticatedError from "../errors/unauthenticatedError";
import { validateAccessToken } from "../utils/jwt";
import { IRole } from "../interfaces/users";

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
