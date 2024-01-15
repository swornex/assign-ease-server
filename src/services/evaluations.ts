import BadRequestError from "../errors/badRequestError";
import { IEvaluation } from "../interfaces/evaluations";
import EvaluationModel from "../models/evaluations";

/**
 * Evaluates an assignment asynchronously.
 *
 * @param {IEvaluation} evaluation - The evaluation object containing the details of the assignment.
 * @return {Promise} Returns the evaluated assignment data.
 */
export const evaluateAssignment = async (evaluation: IEvaluation) => {
  const { submissionId } = evaluation;
  const existingEvaluation = await EvaluationModel.getSubmissionEvaluation(
    submissionId
  );

  if (existingEvaluation) {
    throw new BadRequestError("This assignment has already been evaluated");
  }

  const data = await EvaluationModel.evaluateAssignment(evaluation);

  return data;
};
