import { Router } from "express";
import { dashboard } from "../controllers/dashboard";
import { accessAuth } from "../middlewares/auth";
import { validateReqQuery } from "../middlewares/validator";
import { dashboardGetSchema } from "../schemas/dashboard";

const router = Router();

router.get("/", [accessAuth, validateReqQuery(dashboardGetSchema)], dashboard);

export default router;
