import { body } from "express-validator";

// more info about validators:
// https://express-validator.github.io/docs/guides/validation-chain
// https://github.com/validatorjs/validator.js#validators

const firstNameValidator = body("firstName")
  // first name must exist, if not this message will be displayed
  .exists()
  .withMessage("is required")
  // bail prevents the remainder of the validation chain for this field from being executed if
  // there was an error
  .bail()
  .isString()
  .withMessage("must be a string")
  .bail()
  .notEmpty()
  .withMessage("cannot be empty");

const lastNameValidator = body("lastName")
  // last name must exist, if not this message will be displayed
  .exists()
  .withMessage("is required")
  .bail()
  .isString()
  .withMessage("must be a string")
  .bail()
  .notEmpty()
  .withMessage("cannot be empty");

const emailValidator = body("email")
  .exists()
  .withMessage("is required")
  .isEmail()
  .withMessage("is an invalid format");

export const createUser = [firstNameValidator, lastNameValidator, emailValidator];
