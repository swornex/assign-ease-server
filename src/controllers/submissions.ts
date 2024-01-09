import { Request, Response } from "express";
import * as submissionServices from "../services/submissions";

export const submitAssignment = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthenticated");
  }

  const submittedBy = req.user.id;

  const { body, params } = req;

  const data = await submissionServices.submitAssignment({
    ...body,
    assignmentId: params.assignmentId,
    submittedBy
  });
  res.json({ data });
};
