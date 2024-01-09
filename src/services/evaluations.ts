import BadRequestError from "../errors/badRequestError";
import { IEvaluation } from "../interfaces/evaluations";
import EvaluationModel from "../models/evaluations";

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
