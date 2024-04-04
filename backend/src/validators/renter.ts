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

const phoneValidator = body("phone").optional().isString().withMessage("must be a string");

const emailValidator = body("email").optional().isEmail().withMessage("is invalid");

const uidValidator = body("uid")
  .exists()
  .withMessage("is required")
  .bail()
  .isString()
  .withMessage("must be a string")
  .bail()
  .notEmpty()
  .withMessage("cannot be empty");

const programValidator = body("program")
  .exists()
  .withMessage("is required")
  .bail()
  .isString()
  .withMessage("must be a string")
  .bail()
  .notEmpty()
  .withMessage("cannot be empty");

const adultsValidator = body("adults")
  .exists()
  .withMessage("is required")
  .bail()
  .isNumeric()
  .withMessage("must be a number");

const childrenValidator = body("children")
  .exists()
  .withMessage("is required")
  .bail()
  .isNumeric()
  .withMessage("must be a number");

export const createRenterCandidate = [
  firstNameValidator,
  lastNameValidator,
  phoneValidator,
  emailValidator,
  uidValidator,
  programValidator,
  adultsValidator,
  childrenValidator,
];
