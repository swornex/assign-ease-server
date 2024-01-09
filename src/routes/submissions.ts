import { Router } from "express";

import * as submissionControllers from "../controllers/submissions";
import { accessAuth, roleAuth } from "../middlewares/auth";
import { ROLES } from "../constants/collection";

const router = Router();

router.post(
  "/:assignmentId",
  [accessAuth, roleAuth(ROLES.USER)],
  submissionControllers.submitAssignment
);

export default router;
