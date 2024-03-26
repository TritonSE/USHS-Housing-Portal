/**
 * Request validation middleware
 */
import { RequestHandler } from "express";
import { ContextRunner, ValidationChain, validationResult } from "express-validator";
import { Middleware } from "express-validator/src/base";
import createHttpError from "http-errors";

/**
 * Rejected a request with 400 if it does not meet the validation
 * criteria specified using express-validator.
 */
const validateRequest: RequestHandler = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    // No errors, proceed to next handler in the chain
    next();
    return;
  }

  const allErrors = result.mapped();

  // Collect all validation errors
  const errorMessages = Object.entries(allErrors).map(([fieldName, error]) => {
    if (error.type === "unknown_fields") {
      // Catch unknown fields error and return a more user-friendly message
      return `${error.msg as string}: ${error.fields.map(({ path }) => path).join(", ")}`;
    }
    return `${fieldName} ${error.msg as string}`;
  });

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
export const validateWith = (validators: (ValidationChain | (Middleware & ContextRunner))[]) => [
  ...validators,
  validateRequest,
];
