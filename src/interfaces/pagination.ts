import { IRole } from "./users";

export interface IGetUserQuery {
  page?: number;
  size?: number;
  role?: IRole;
}

export interface IPagination extends IGetUserQuery {
  limit: number;
  offset: number;
}
