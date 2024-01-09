import { IPagination } from "../interfaces/pagination";
import { IRole } from "../interfaces/users";
import UserAssignmentStatus from "../models/userAssignmentStatus";
import { buildMeta, getPaginationOptions } from "../utils/pagination";

export const dashboard = async (
  role: IRole,
  userId: number,
  filter: IPagination
) => {
  const { page, size } = filter;

  const pageDetails = getPaginationOptions({ page, size });
  const dashBoardPromises =
    role === "User"
      ? UserAssignmentStatus.getDataByUserId(userId, pageDetails)
      : UserAssignmentStatus.getAllAssignmentData(pageDetails);

  const countPromise =
    role === "User"
      ? UserAssignmentStatus.countAll(userId)
      : UserAssignmentStatus.countAll();

  const [data, count] = await Promise.all([dashBoardPromises, countPromise]);

  const total = count.count;

  const meta = buildMeta(total, size, page);

  return { data, meta };
};
