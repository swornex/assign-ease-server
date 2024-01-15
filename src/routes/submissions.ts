import { Router } from "express";

import * as submissionControllers from "../controllers/submissions";
import { accessAuth, roleAuth } from "../middlewares/auth";
import { ROLES } from "../constants/collection";
import { validateReqBody } from "../middlewares/validator";
import { submitAssignmentSchema } from "../schemas/submissions";

const router = Router();

router.post(
  "/",
  [accessAuth, roleAuth(ROLES.USER), validateReqBody(submitAssignmentSchema)],
  submissionControllers.submitAssignment
);

export default router;
