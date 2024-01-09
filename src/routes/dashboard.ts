import { Router } from "express";
import { dashboard } from "../controllers/dashboard";
import { accessAuth } from "../middlewares/auth";

const router = Router();

router.get("/", [accessAuth], dashboard);

export default router;
