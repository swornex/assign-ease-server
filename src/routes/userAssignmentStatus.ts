import { Router } from "express";
import { accessAuth } from "../middlewares/auth";
import { validateReqQuery } from "../middlewares/validator";
import { userAssignmentStatusGetSchema } from "../schemas/userAssignmentStatus";
import { getByAssignmentId } from "../controllers/userAssignmentStatus";

const router = Router();

router.get(
  "/",
  [accessAuth, validateReqQuery(userAssignmentStatusGetSchema)],
  getByAssignmentId
);

export default router;
