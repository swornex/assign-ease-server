import jwt from "jsonwebtoken";
import config from "../config";
import { IGetUser } from "../interfaces/users";
import { IJwtPayload } from "../interfaces/jwt";

export const generateAccessToken = (user: Omit<IGetUser, "password">) => {
  const accessToken = jwt.sign({ data: user }, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.accessTokenExpiresIn
  });

  return accessToken;
};

export const validateAccessToken = (token: string) => {
  return jwt.verify(token, config.jwt.accessTokenSecret) as IJwtPayload;
};
