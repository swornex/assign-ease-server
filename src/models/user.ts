import db from "../db";
import { TABLES } from "../constants/table";
import BaseModel from "./baseModel";
import { IUser } from "../interfaces/users";
import { IPagination } from "../interfaces/pagination";

class UserModel extends BaseModel {
  static getAllUsers = (params: { offset: number; limit: number }) => {
    const query = this.queryBuilder()
      .select(
        "id",
        db.raw("CONCAT(first_name,'', last_name) AS name"),
        "email",
        "role",
        "status",
        "created_at",
        "created_by",
        "updated_at",
        "updated_by"
      )
      .from(TABLES.USERS);

    query.offset(params.offset).limit(params.limit);
    return query;
  };

  static countAll = () => {
    return this.queryBuilder()
      .count({ count: "id" })
      .from(TABLES.USERS)
      .first();
  };

  static getUserById = (id: string) => {
    return this.queryBuilder()
      .select(
        "id",
        db.raw("CONCAT(first_name,'', last_name) AS name"),
        "email",
        "role",
        "status",
        "created_at",
        "created_by",
        "updated_at",
        "updated_by"
      )
      .from(TABLES.USERS)
      .where({ id })
      .first();
  };

  static getByEmail = (email: string) => {
    return this.queryBuilder()
      .select("*")
      .from(TABLES.USERS)
      .where({ email })
      .first();
  };

  static createUser = (user: IUser) => {
    return this.queryBuilder().insert(user).into(TABLES.USERS);
  };
}

export default UserModel;
