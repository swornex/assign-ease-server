import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import NotFoundError from "../errors/notFoundError";
import UserModel from "../models/user";
import config from "../config";

export const login = async (email: string, password: string) => {
  const user = await UserModel.getByEmail(email);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isPasswordMatch = bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new NotFoundError("Incorrect password");
  }

  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.accessTokenExpiresIn
  });

  return { accessToken };
};
