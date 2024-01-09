import { Router } from "express";

import * as userControllers from "../controllers/users";
import { validateReqBody, validateReqQuery } from "../middlewares/validator";
import { userCreateSchema, userGetSchema } from "../schemas/users";
import { accessAuth, roleAuth } from "../middlewares/auth";
import { ROLES } from "../constants/collection";

const router = Router();

router.get(
  "/",
  [accessAuth, roleAuth(ROLES.ADMIN), validateReqQuery(userGetSchema)],
  userControllers.getAllUsers
);

router.get("/:id", [accessAuth], userControllers.getUserById);

router.post(
  "/",
  [accessAuth, roleAuth(ROLES.ADMIN), validateReqBody(userCreateSchema)],
  userControllers.createUser
);

router.delete(
  "/:id",
  [accessAuth, roleAuth(ROLES.ADMIN)],
  userControllers.deleteUser
);

export default router;
