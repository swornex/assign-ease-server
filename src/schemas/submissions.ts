import joi from "joi";

export const submitAssignmentSchema = joi.object({
  submissionUrl: joi.string().required().trim(),
  assignmentId: joi.number().required().min(1)
});
