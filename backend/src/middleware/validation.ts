/**
 * Request validation middleware
 */
import { RequestHandler } from "express";
import { ValidationChain, validationResult } from "express-validator";
import createHttpError from "http-errors";

/**
 * Rejected a request with 400 if it does not meet the validation
 * criteria specified using express-validator.
 */
const validateRequest: RequestHandler = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    // No errors, proceed to next handler in the chain
    return next();
  }

  const allErrors = result.mapped();

  // Collect all validation errors
  const errorMessages = Object.entries(allErrors).map(
    ([fieldName, error]) => `${fieldName} ${error.msg}`,
  );

  const errorString = `Invalid fields: ${[...errorMessages].join(", ")}`;

  throw createHttpError(400, errorString);
};

/**
 * Validates a request using express-validator (short-circuiting the handler chain
 * if necessary and returning the error messages to the client).
 *
 * @param validators a list of validation chains to apply to the request
 * @returns the validation chain with the validation handler appended
 */
export const validateWith = (validators: ValidationChain[]) => [...validators, validateRequest];
