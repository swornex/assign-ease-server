import joi from "joi";

export const submitAssignmentSchema = joi.object({
  assignmentUrl: joi.string().required().trim()
});
