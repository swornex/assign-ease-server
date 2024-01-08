import NotFoundError from "../errors/notFoundError";
import { IAssignments, IUpdateAssignments } from "../interfaces/assignments";
import AssignmentModel from "../models/assignments";

export const addAssignments = async (assignment: IAssignments) => {
  const data = await AssignmentModel.addAssignments(assignment);
  return data;
};

export const getAssignments = async () => {
  const data = await AssignmentModel.getAssignments();
  return data;
};

export const getAssignmentById = async (id: string) => {
  const data = await AssignmentModel.getAssignmentById(id);
  return data;
};

export const updateAssignment = async (
  id: string,
  updateAssignment: IUpdateAssignments
) => {
  const assignment = AssignmentModel.getAssignmentById(id);

  if (!assignment) {
    throw new NotFoundError(`Assignment with id: ${id} not found`);
  }

  const data = await AssignmentModel.updateAssignment(id, updateAssignment);
  return data;
};
