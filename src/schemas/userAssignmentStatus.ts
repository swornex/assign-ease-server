import joi from "joi";

export const userAssignmentStatusGetSchema = joi.object({
  userId: joi.number().integer().optional().min(1),
  assignmentId: joi.number().integer().required().min(1)
});
