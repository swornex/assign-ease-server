import { IAssignments } from "../interfaces/asasignments";
import AssignmentModel from "../models/assignments";

export const addAssignments = async (assignment: IAssignments) => {
  const data = await AssignmentModel.addAssignments(assignment);
  return data;
};
