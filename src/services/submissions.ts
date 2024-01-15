import BadRequestError from "../errors/badRequestError";
import { ISubmission } from "../interfaces/submissions";
import SubmissionModel from "../models/submission";

/**
 * Submits an assignment.
 *
 * @param {ISubmission} submission - The submission object containing details about the assignment submission.
 * @returns {Promise} - A promise that resolves to the data of the submitted assignment.
 */
export const submitAssignment = async (submission: ISubmission) => {
  const { submittedBy, assignmentId } = submission;
  const existingSubmission = await SubmissionModel.getUserAssignmentSubmission(
    submittedBy,
    assignmentId
  );

  if (existingSubmission) {
    throw new BadRequestError("You have already submitted this assignment");
  }

  const [data] = await SubmissionModel.submitAssignment(submission);
  return data;
};
