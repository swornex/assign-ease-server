import { Router } from "express";

import auth from "./auth";
import users from "./users";
import assignments from "./assignments";
import submissions from "./submissions";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/assignments", assignments);
router.use("/submissions", submissions);

export default router;
