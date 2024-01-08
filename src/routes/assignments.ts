import { Router } from "express";
import * as assignmentControllers from "../controllers/assignments";
import { accessAuth } from "../middlewares/auth";

const router = Router();

router.post("/", accessAuth, assignmentControllers.addAssignment);
router.get("/", assignmentControllers.getAssignments);
router.get("/:id", assignmentControllers.getAssignmentById);
router.patch("/:id", accessAuth, assignmentControllers.updateAssignment);

export default router;
