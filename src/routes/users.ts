import { Router } from "express";

import * as userControllers from "../controllers/users";
import { validateReqBody, validateReqQuery } from "../middlewares/validator";
import { userCreateSchema, userGetSchema } from "../schemas/users";

const router = Router();

router.get("/", validateReqQuery(userGetSchema), userControllers.getAllUsers);
router.get("/:id", userControllers.getUserById);
router.post("/", validateReqBody(userCreateSchema), userControllers.createUser);

export default router;
