import { Request, Response, NextFunction } from "express";

import * as userServices from "./../services/users";
import { IPagination } from "../interfaces/pagination";

export const getAllUsers = async (
  req: Request<{}, {}, {}, IPagination>,
  res: Response
) => {
  const { query } = req;
  const { data, meta } = await userServices.getAllUsers(query);
  res.json({ data, meta });
};

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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error("Unauthenticated");
    }

    const createdBy = req.user.id;
    const data = await userServices.createUser({ ...req.body, createdBy });
    res.json({ data });
  } catch (e: unknown) {
    next(e);
  }
};

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
