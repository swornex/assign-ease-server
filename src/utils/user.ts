import { IGetUser } from "../interfaces/users";

/**
 * Serializes a user object by removing the password field.
 *
 * @param {IGetUser} user - The user object to be serialized.
 * @return {Omit<IGetUser, "password">} The serialized user object without the password field.
 */
export const serialize = (user: IGetUser) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
