import { Router } from "express";
import { accessAuth, roleAuth } from "../middlewares/auth";
import { ROLES } from "../constants/collection";
import { evaluateAssignment } from "../controllers/evaluations";
import { validateReqBody } from "../middlewares/validator";
import { evaluationAssignmentSchema } from "../schemas/evaluations";

const router = Router();

router.post(
  "/",
  [
    accessAuth,
    roleAuth(ROLES.ADMIN),
    validateReqBody(evaluationAssignmentSchema)
  ],
  evaluateAssignment
);

export default router;
