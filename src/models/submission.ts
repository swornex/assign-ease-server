import { ISubmission } from "../interfaces/submissions";
import BaseModel from "./baseModel";

class SubmissionModel extends BaseModel {
  static submitAssignment = (submission: ISubmission) => {
    return this.queryBuilder()
      .insert(submission)
      .into("submissions")
      .returning("*");
  };
}

export default SubmissionModel;
