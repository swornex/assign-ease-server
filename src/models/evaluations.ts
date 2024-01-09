import { IEvaluation } from "../interfaces/evaluations";
import BaseModel from "./baseModel";

class EvaluationModel extends BaseModel {
  static evaluateAssignment(evaluation: IEvaluation) {
    return this.queryBuilder()
      .insert(evaluation)
      .into("evaluations")
      .returning("*");
  }
}

export default EvaluationModel;
