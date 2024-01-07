export type IRole = "Admin" | "User";
export type IStatus = "Active" | "Delete";

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: IRole;
}

export interface IGetUser extends ICreateUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  status: IStatus;
}
