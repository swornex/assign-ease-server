import jwt from "jsonwebtoken";
import config from "../config";
import { IGetUser } from "../interfaces/users";
import { IJwtPayload } from "../interfaces/jwt";

/**
 * Generates an access token for a given user.
 *
 * @param {Omit<IGetUser, "password">} user - The user object without the password.
 * @return {string} The generated access token.
 */
export const generateAccessToken = (user: Omit<IGetUser, "password">) => {
  const accessToken = jwt.sign({ data: user }, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.accessTokenExpiresIn
  });

  return accessToken;
};

/**
 * Validates an access token.
 *
 * @param {string} token - The access token to be validated.
 * @return {IJwtPayload} - The payload of the access token.
 */
export const validateAccessToken = (token: string) => {
  return jwt.verify(token, config.jwt.accessTokenSecret) as IJwtPayload;
};
