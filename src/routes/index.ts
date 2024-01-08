import { Router } from "express";

import auth from "./auth";
import users from "./users";
import assignments from "./assignments";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/assignments", assignments);

export default router;
