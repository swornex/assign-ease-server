import NotFoundError from "../errors/notFoundError";
import { IGetUserQuery, IPagination } from "../interfaces/pagination";
import { ICreateUser } from "../interfaces/users";
import UserModel from "../models/users";
import { hashPassword } from "../utils/bcrypt";
import { buildMeta, getPaginationOptions } from "../utils/pagination";
import { serialize } from "../utils/user";

/**
 * Retrieves all users based on the provided filter options.
 *
 * @param {IGetUserQuery} filter - The filter options to apply to the user retrieval.
 * @returns {Promise<{ data: User[], meta: Meta }>} - An object containing the retrieved user data and metadata.
 */
export const getAllUsers = async (filter: IGetUserQuery = {}) => {
  const { page, size } = filter;

  const pageDetails = getPaginationOptions({ page, size });
  const userPromise = UserModel.getAllUsers({ ...pageDetails, ...filter });
  const countPromise = UserModel.countAll();

  const [users, count] = await Promise.all([userPromise, countPromise]);

  const total = count.count;

  const meta = buildMeta(total, size, page);

  return { data: users, meta };
};

/**
 * Retrieves a user by their ID from the database.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @return {Promise<User>} The user object if found.
 * @throws {NotFoundError} If the user with the given ID is not found.
 */
export const getUserById = async (id: number) => {
  const data = await UserModel.getUserById(id);

  if (!data) {
    throw new NotFoundError(`Id ${id} not found`);
  }

  return data;
};

/**
 * Creates a new user.
 *
 * @param {ICreateUser} user - The user data.
 * @return {Promise<Omit<IGetUser, "password">>} The serialized user data.
 */
export const createUser = async (user: ICreateUser) => {
  const hashedPassword = hashPassword(user.password);

  const [data] = await UserModel.createUser({
    ...user,
    password: hashedPassword
  });

  return serialize(data);
};

/**
 * Deletes a user by their ID.
 *
 * @param {number} id - The ID of the user to be deleted.
 * @return {Promise<string>} A message indicating the success of the deletion operation.
 */
export const deleteUser = async (id: number) => {
  const user = await getUserById(id);

  if (!user) {
    throw new NotFoundError(`Id ${id} not found`);
  }

  await UserModel.deleteUser(id);

  return `User ${id} deleted`;
};
