import db from "../db";
import { TABLES, USER_STATUS } from "../constants/collection";
import BaseModel from "./baseModel";
import { ICreateUser } from "../interfaces/users";
import { IPagination } from "../interfaces/pagination";
class UserModel extends BaseModel {
  static getAllUsers = (filter: IPagination) => {
    const query = this.queryBuilder()
      .select(
        "id",
        db.raw("CONCAT(first_name,' ', last_name) AS name"),
        "email",
        "role",
        "status",
        "created_at",
        "created_by",
        "updated_at",
        "updated_by"
      )
      .from(TABLES.USERS);

    if (filter.role) {
      filter.role === "User"
        ? query.where({ role: "User" })
        : query.where({ role: "Admin" });
    }

    query
      .orderBy("createdAt", "desc")
      .offset(filter.offset)
      .limit(filter.limit);
    return query;
  };

  static countAll = () => {
    return this.queryBuilder()
      .count({ count: "id" })
      .from(TABLES.USERS)
      .first();
  };

  static getUserById = (id: number) => {
    return this.queryBuilder()
      .select(
        "id",
        db.raw("CONCAT(first_name,' ', last_name) AS name"),
        "email",
        "role",
        "status",
        "created_at",
        "created_by",
        "updated_at",
        "updated_by"
      )
      .from(TABLES.USERS)
      .where({ id, status: USER_STATUS.ACTIVE })
      .first();
  };

  static getByEmail = (email: string) => {
    return this.queryBuilder()
      .select("*")
      .from(TABLES.USERS)
      .where({ email, status: USER_STATUS.ACTIVE })
      .first();
  };

  static createUser = (user: ICreateUser) => {
    return this.queryBuilder().insert(user).into(TABLES.USERS).returning("*");
  };

  static deleteUser = (id: number) => {
    return this.queryBuilder()
      .update({ status: USER_STATUS.DELETED, updatedAt: new Date() })
      .where({ id })
      .from(TABLES.USERS);
  };
}

export default UserModel;
