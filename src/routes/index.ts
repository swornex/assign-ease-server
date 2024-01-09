import { Router } from "express";

import auth from "./auth";
import users from "./users";
import assignments from "./assignments";
import submissions from "./submissions";
import dashboard from "./dashboard";
import evaluations from "./evaluations";

const router = Router();

router.use("/auth", auth);

router.use("/users", users);

router.use("/assignments", assignments);

router.use("/submissions", submissions);

router.use("/dashboard", dashboard);

router.use("/evaluations", evaluations);

export default router;
