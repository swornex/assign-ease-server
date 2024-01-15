import bcrypt from "bcrypt";

import config from "../config";

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password to be hashed.
 * @return {string} - The hashed password.
 */
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, config.bcrypt.saltRounds);
};
