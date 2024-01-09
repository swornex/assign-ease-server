import NotFoundError from "../errors/notFoundError";
import { IAssignments, IUpdateAssignments } from "../interfaces/assignments";
import { IPagination } from "../interfaces/pagination";
import AssignmentModel from "../models/assignments";
import { buildMeta, getPaginationOptions } from "../utils/pagination";

export const addAssignments = async (assignment: IAssignments) => {
  const [data] = await AssignmentModel.addAssignments(assignment);
  return data;
};

export const getAssignments = async (filter: IPagination) => {
  const { page, size } = filter;

  const pageDetails = getPaginationOptions({ page, size });
  const assignmentPromises = AssignmentModel.getAssignments(pageDetails);
  const countPromise = AssignmentModel.countAll();

  const [assignments, count] = await Promise.all([
    assignmentPromises,
    countPromise
  ]);

  const total = count.count;

  const meta = buildMeta(total, size, page);

  return { data: assignments, meta };
};

export const getAssignmentById = async (id: number) => {
  const [data] = await AssignmentModel.getAssignmentById(id);
  return data;
};

export const updateAssignment = async (
  id: number,
  updateAssignment: IUpdateAssignments
) => {
  const assignment = AssignmentModel.getAssignmentById(id);

  if (!assignment) {
    throw new NotFoundError(`Assignment with id: ${id} not found`);
  }

  const [data] = await AssignmentModel.updateAssignment(id, updateAssignment);
  return data;
};
