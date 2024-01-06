import { Request, Response } from "express";

import * as userServices from "./../services/users";

export const getAllUsers = async (_req: Request, res: Response) => {
  const data = await userServices.getAllUsers();
  res.json({ data });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = await userServices.createUser(req.body);
    res.json({ data });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.json({ error: e.message });
    }
  }
};
