import db from "../db";
import { TABLES } from "../constants/table";
import BaseModel from "./baseModel";
import { IUser } from "../interfaces/users";

class UserModel extends BaseModel {
  static getAllUsers = () => {
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
      .from(TABLES.USERS);
  };

  static getByEmail = (email: string) => {
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
      .where("email", email);
  };

  static createUser = (user: IUser) => {
    return this.queryBuilder().insert(user).into(TABLES.USERS);
  };
}

export default UserModel;
