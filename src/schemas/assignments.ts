import joi from "joi";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/pagination";

export const addAssignmentSchema = joi.object({
  title: joi.string().required().trim(),
  description: joi.string().required().trim(),
  deadline: joi.date().required()
});

export const getAssignmentSchema = joi.object({
  page: joi.number().integer().min(1).default(DEFAULT_PAGE),
  size: joi.number().integer().min(1).default(DEFAULT_PAGE_SIZE)
});
