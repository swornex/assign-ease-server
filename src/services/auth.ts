import bcrypt from "bcrypt";

import NotFoundError from "../errors/notFoundError";
import UserModel from "../models/users";
import { generateAccessToken } from "../utils/jwt";
import { serialize } from "../utils/user";

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @return {Promise<{ accessToken: string }>} - A promise that resolves to an object containing the access token.
 */
export const login = async (email: string, password: string) => {
  const user = await UserModel.getByEmail(email);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new NotFoundError("Incorrect password");
  }

  const accessToken = generateAccessToken(serialize(user));

  return { accessToken };
};
