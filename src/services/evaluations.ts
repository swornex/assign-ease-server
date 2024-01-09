import { IEvaluation } from "../interfaces/evaluations";
import EvaluationModel from "../models/evaluations";

export const evaluateAssignment = async (evaluation: IEvaluation) => {
  const data = await EvaluationModel.evaluateAssignment(evaluation);

  return data;
};
