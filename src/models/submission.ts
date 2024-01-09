import { ISubmission } from "../interfaces/submissions";
import BaseModel from "./baseModel";

class SubmissionModel extends BaseModel {
  static submitAssignment = (submission: ISubmission) => {
    return this.queryBuilder()
      .insert(submission)
      .into("submissions")
      .returning("*");
  };

  static getUserAssignmentSubmission = (
    submittedBy: number,
    assignmentId: number
  ) => {
    return this.queryBuilder()
      .select("*")
      .from("submissions")
      .where({ submittedBy, assignmentId })
      .first();
  };
}

export default SubmissionModel;
