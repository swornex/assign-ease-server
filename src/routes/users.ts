import { Router } from "express";

import * as userControllers from "../controllers/users";

const router = Router();

router.get("/", userControllers.getAllUsers);
router.post("/", userControllers.createUser);

export default router;
