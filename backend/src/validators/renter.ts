import { body } from "express-validator";

const firstNameValidator = body("firstName")
  .exists()
  .withMessage("is required")
  .bail()
  .isString()
  .withMessage("must be a string")
  .bail()
  .notEmpty()
  .withMessage("cannot be empty");

const lastNameValidator = body("lastName")
  .exists()
  .withMessage("is required")
  .bail()
  .isString()
  .withMessage("must be a string")
  .bail()
  .notEmpty()
  .withMessage("cannot be empty");

const contactInfoValidator = body("contactInfo")
  .exists()
  .withMessage("is required")
  .bail()
  .isString()
  .withMessage("must be a string")
  .bail()
  .notEmpty()
  .withMessage("cannot be empty");

const programValidator = body("program").optional().isString().withMessage("must be a string");

export const createRenterCandidate = [
  firstNameValidator,
  lastNameValidator,
  contactInfoValidator,
  programValidator,
];
