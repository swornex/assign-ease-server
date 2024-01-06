import joi from "joi";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/pagination";

export const userLoginSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required()
});

export const userCreateSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
  firstName: joi.string().trim().required(),
  lastName: joi.string().trim().required(),
  role: joi.valid("Admin" || "User").default("User")
});

export const userGetSchema = joi.object({
  page: joi.number().integer().min(1).default(DEFAULT_PAGE),
  size: joi.number().integer().min(1).max(30).default(DEFAULT_PAGE_SIZE)
});
