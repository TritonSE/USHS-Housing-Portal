/**
 * Request validation middleware
 */
// import * as firebaseAdmin from "@firebase-admin";
import { RequestHandler } from "express";
import { ValidationChain, validationResult } from "express-validator";
import createHttpError from "http-errors";

const firebaseAdmin = require("../firebase-admin");

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
  const errorMessages = Object.entries(allErrors).map(
    ([fieldName, error]) => `${fieldName} ${error.msg}`,
  );

  const errorString = `Invalid fields: ${[...errorMessages].join(", ")}`;

  throw createHttpError(400, errorString);
};

const validateUser: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).send({ message: "Authorization Token Required" });
  }

  firebaseAdmin.firebaseAuth
    .verifyIdToken(token)
    .then((decodedToken: string) => {
      console.log("DECODED TOKEN");
      console.log(decodedToken);
      next();
    })
    .catch(() => {
      res.status(401).send({ message: "Error while decoding token" });
    });

  res.status(200).send({ message: "Reached End of Method" });
};

/**
 * Validates a request using express-validator (short-circuiting the handler chain
 * if necessary and returning the error messages to the client).
 *
 * @param validators a list of validation chains to apply to the request
 * @returns the validation chain with the validation handler appended
 */
export const validateWith = (validators: ValidationChain[]) => [
  ...validators,
  validateRequest,
  validateUser,
];
