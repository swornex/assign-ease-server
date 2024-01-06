import { Request, Response } from "express";

import * as userServices from "./../services/users";

export const getAllUsers = (req: Request, res: Response) => {
  const data = userServices.getAllUsers();
  res.json({ data });
};
