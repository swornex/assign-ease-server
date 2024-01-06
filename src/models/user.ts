import BaseModel from "./baseModel";

class UserModel extends BaseModel {
  static getAllUsers = () => {
    return this.queryBuilder().select("*").from("users");
  };
}

export default UserModel;
