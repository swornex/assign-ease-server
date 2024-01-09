import { IRole } from "../interfaces/users";
import UserAssignmentStatus from "../models/userAssignmentStatus";

export const dashboard = async (role: IRole, userId: number) => {
  if (role === "User") {
    const data = await UserAssignmentStatus.getDataByUserId(userId);
    return data;
  } else {
    const data = await UserAssignmentStatus.getAllAssignmentData();
    return data;
  }
};
