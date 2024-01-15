import NotFoundError from "../errors/notFoundError";
import { IAssignments, IUpdateAssignments } from "../interfaces/assignments";
import { IPagination } from "../interfaces/pagination";
import AssignmentModel from "../models/assignments";
import { buildMeta, getPaginationOptions } from "../utils/pagination";

/**
 * Adds assignments to the system.
 *
 * @param {IAssignments} assignment - The assignment object to be added.
 * @return {Promise} The added assignment data.
 */
export const addAssignments = async (assignment: IAssignments) => {
  const [data] = await AssignmentModel.addAssignments(assignment);
  return data;
};

/**
 * Retrieves assignments based on the provided filter.
 *
 * @param {IPagination} filter - The pagination filter.
 * @return {Promise<{ data: Assignment[], meta: Meta }>} A promise that resolves to an object containing the assignments and meta data.
 */
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

/**
 * Retrieves an assignment by its ID.
 *
 * @param {number} id - The ID of the assignment.
 * @return {Promise} The assignment data.
 */
export const getAssignmentById = async (id: number) => {
  const [data] = await AssignmentModel.getAssignmentById(id);
  return data;
};

/**
 * Updates an assignment with the specified id.
 *
 * @param {number} id - The id of the assignment to update.
 * @param {IUpdateAssignments} updateAssignment - The updated assignment data.
 * @return {Promise} The updated assignment.
 */
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
