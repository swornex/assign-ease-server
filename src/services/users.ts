import NotFoundError from "../errors/notFoundError";
import { IPagination } from "../interfaces/pagination";
import { ICreateUser } from "../interfaces/users";
import UserModel from "../models/users";
import { hashPassword } from "../utils/bcrypt";
import { buildMeta, getPaginationOptions } from "../utils/pagination";

export const getAllUsers = async (filter: IPagination) => {
  const { page, size } = filter;

  const pageDetails = getPaginationOptions({ page, size });
  const userPromise = UserModel.getAllUsers({ ...pageDetails });
  const countPromise = UserModel.countAll();

  const [users, count] = await Promise.all([userPromise, countPromise]);

  const total = count.count;

  const meta = buildMeta(total, size, page);

  return { data: users, meta };
};

export const getUserById = async (id: string) => {
  const data = await UserModel.getUserById(id);
  if (!data) {
    throw new NotFoundError(`Id ${id} not found`);
  }
  return data;
};

export const createUser = async (user: ICreateUser) => {
  const hashedPassword = hashPassword(user.password);

  const data = await UserModel.createUser({
    ...user,
    password: hashedPassword
  });
  return data;
};

export const deleteUser = async (id: string) => {
  const user = await getUserById(id);

  if (!user) {
    throw new NotFoundError(`Id ${id} not found`);
  }

  await UserModel.deleteUser(id);
  return `User ${id} deleted`;
};
