import { Router } from "express";
import * as assignmentControllers from "../controllers/assignments";
import { accessAuth, roleAuth } from "../middlewares/auth";
import { ROLES } from "../constants/collection";
import { validateReqBody, validateReqQuery } from "../middlewares/validator";
import {
  addAssignmentSchema,
  getAssignmentSchema
} from "../schemas/assignments";

const router = Router();

router.post(
  "/",
  [accessAuth, roleAuth(ROLES.ADMIN), validateReqBody(addAssignmentSchema)],
  assignmentControllers.addAssignment
);

router.get(
  "/",
  [accessAuth, validateReqQuery(getAssignmentSchema)],
  assignmentControllers.getAssignments
);

router.get("/:id", [accessAuth], assignmentControllers.getAssignmentById);

router.patch(
  "/:id",
  [accessAuth, roleAuth(ROLES.ADMIN)],
  assignmentControllers.updateAssignment
);

export default router;
