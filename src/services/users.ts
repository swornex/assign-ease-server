import { IUser } from "../interfaces/users";
import UserModel from "../models/user";
import { hashPassword } from "../utils/bcrypt";

export const getAllUsers = async () => {
  const data = await UserModel.getAllUsers();
  return data;
};

export const createUser = async (user: IUser) => {
  const hashedPassword = hashPassword(user.password);

  const data = await UserModel.createUser({
    ...user,
    password: hashedPassword
  });
  return data;
};
