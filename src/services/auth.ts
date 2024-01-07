import bcrypt from "bcrypt";

import NotFoundError from "../errors/notFoundError";
import UserModel from "../models/user";
import { generateAccessToken } from "../utils/jwt";
import { serialize } from "../utils/user";

export const login = async (email: string, password: string) => {
  const user = await UserModel.getByEmail(email);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isPasswordMatch = bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new NotFoundError("Incorrect password");
  }

  const accessToken = generateAccessToken(serialize(user));

  return { accessToken };
};
