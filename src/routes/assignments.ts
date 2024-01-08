import { Router } from "express";
import * as assignmentControllers from "../controllers/assignments";
import { accessAuth } from "../middlewares/auth";

const router = Router();

router.post("/", accessAuth, assignmentControllers.addAssignment);
router.get("/");
router.get("/:id");
router.put("/:id");

export default router;
