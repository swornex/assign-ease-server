import { Router } from "express";

import * as authControllers from "../controllers/auth";
import { validateReqBody } from "../middlewares/validator";
import { userLoginSchema } from "../schemas/users";

const router = Router();

router.use("/login", [validateReqBody(userLoginSchema)], authControllers.login);

export default router;
