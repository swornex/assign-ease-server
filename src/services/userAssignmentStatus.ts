import NotFoundError from "../errors/notFoundError";
import { IUserAssignmentStatus } from "../interfaces/userAssignmentStatus";
import UserAssignmentStatus from "../models/userAssignmentStatus";

/**
 * Retrieves data by assignment ID.
 *
 * @param {IUserAssignmentStatus} filter - The filter object to specify the criteria for data retrieval.
 * @return {Promise<IUserAssignmentStatus>} The retrieved data.
 */
export const getByAssignmentId = async (filter: IUserAssignmentStatus) => {
  const [data] = await UserAssignmentStatus.getDataByUserAssignmentId(filter);

  if (!data) {
    throw new NotFoundError("Data not found");
  }

  return data;
};
