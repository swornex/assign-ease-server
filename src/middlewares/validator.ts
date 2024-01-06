import { Schema } from "joi";

import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/badRequestError";

/**
 * Validates the request query against the given schema.
 *
 * @param {Schema} schema - The schema to validate the query against.
 * @returns {Function} - A middleware function that validates the request query and passes it to the next middleware.
 */
export function validateReqQuery(schema: Schema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      return next(new BadRequestError(error.message));
    }

    req.query = value;

    next();
  };
}

/**
 * Validates the request body against a given schema.
 *
 * @param {Schema} schema - The schema to validate the request body against.
 * @return {Function} - This function does not return any value.
 */
export function validateReqBody(schema: Schema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return next(new BadRequestError(error.message));
    }

    req.body = value;

    next();
  };
}
