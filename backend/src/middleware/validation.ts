/**
 * Request validation middleware
 */
import { RequestHandler } from "express";
import { ValidationChain, validationResult } from "express-validator";
import createHttpError from "http-errors";

import { asyncHandler } from "@/controllers/wrappers";
import * as firebaseAdmin from "@/firebase-admin";
import { UserModel } from "@/models/user";

// export type UserRequest = {
//   currentUser: User;
//   headers: {
//     authorization: string;
//   };
// } & Request;

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

const validateUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    token = authHeader.split(" ")[1];
  } else {
    throw createHttpError(401, "Authorization Token Required");
  }

  try {
    const decodedToken = await firebaseAdmin.firebaseAuth.verifyIdToken(token);
    const email = decodedToken.email;

    const user = await UserModel.findOne({ email });
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
    req.body.currentUser = user;
  } catch (error) {
    throw createHttpError(404, "Error finding user");
  }

  next();
});

const validateHousingLocator: RequestHandler = (req, res, next) => {
  validateUser(req, res, () => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
    if (req.body.currentUser.isHousingLocator) {
      next();
    } else {
      res.status(401).send({ message: "Housing Locators only " });
    }
  });
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
export { validateHousingLocator };
