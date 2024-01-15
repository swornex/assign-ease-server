import joi from "joi";

export const evaluationAssignmentSchema = joi.object({
  problemSolvingPoints: joi.number().min(1).max(4).required(),
  finalProductPoints: joi.number().min(1).max(4).required(),
  codeQualityPoints: joi.number().min(1).max(4).required(),
  remarks: joi.string().trim().required(),
  submissionId: joi.number().integer().required().min(1)
});
