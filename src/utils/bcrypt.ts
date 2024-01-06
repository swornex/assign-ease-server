import bcrypt from "bcrypt";

import config from "../config";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, config.bcrypt.saltRounds);
};
