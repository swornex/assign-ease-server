import { ISubmission } from "../interfaces/submissions";
import SubmissionModel from "../models/submission";

export const submitAssignment = async (submission: ISubmission) => {
  const [data] = await SubmissionModel.submitAssignment(submission);
  return data;
};
