import NotFoundError from "../errors/notFoundError";
import { IUserAssignmentStatus } from "../interfaces/userAssignmentStatus";
import UserAssignmentStatus from "../models/userAssignmentStatus";

export const getByAssignmentId = async (filter: IUserAssignmentStatus) => {
  const [data] = await UserAssignmentStatus.getDataByUserAssignmentId(filter);

  if (!data) {
    throw new NotFoundError("Data not found");
  }

  return data;
};
