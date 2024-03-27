import { body, checkExact } from "express-validator";

export const createUnitValidators = [
  checkExact([
    body("landlordFirstName")
      .exists()
      .withMessage("is required")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("cannot be empty"),
    body("landlordLastName")
      .exists()
      .withMessage("is required")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("cannot be empty"),
    body("landlordEmail")
      .exists()
      .withMessage("is required")
      .isEmail()
      .withMessage("must be a valid email"),
    body("landlordPhone")
      .exists()
      .withMessage("is required")
      .isString()
      .withMessage("must be a string"),
    body("streetAddress")
      .exists()
      .withMessage("is required")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("cannot be empty"),
    body("suiteNumber").optional().isString().withMessage("must be a string"),
    body("city")
      .exists()
      .withMessage("is required")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("cannot be empty"),
    body("state")
      .exists()
      .withMessage("is required")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("cannot be empty"),
    body("areaCode")
      .exists()
      .withMessage("is required")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("cannot be empty"),
    body("sqft").exists().withMessage("is required").isNumeric().withMessage("must be a number"),
    body("monthlyRent")
      .exists()
      .withMessage("is required")
      .isNumeric()
      .withMessage("must be a number"),
    body("securityDeposit")
      .exists()
      .withMessage("is required")
      .isNumeric()
      .withMessage("must be a number"),
    body("acceptThirdParty")
      .exists()
      .withMessage("is required")
      .isBoolean()
      .withMessage("must be a boolean"),
    body("housingAuthority")
      .exists()
      .withMessage("is required")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("cannot be empty"),
    body("applicationFeeCost")
      .exists()
      .withMessage("is required")
      .isNumeric()
      .withMessage("must be a number"),
    body("dateAvailable")
      .exists()
      .withMessage("is required")
      .isISO8601()
      .withMessage("must be a ISO8601 date"),
    body("numBeds").exists().withMessage("is required").isNumeric().withMessage("must be a number"),
    body("numBaths")
      .exists()
      .withMessage("is required")
      .isNumeric()
      .withMessage("must be a number"),
    body("appliances")
      .exists()
      .withMessage("is required")
      .isArray()
      .withMessage("must be an array"),
    body("communityFeatures")
      .exists()
      .withMessage("is required")
      .isArray()
      .withMessage("must be an array"),
    body("parking").exists().withMessage("is required").isArray().withMessage("must be an array"),
    body("accessibility")
      .exists()
      .withMessage("is required")
      .isArray()
      .withMessage("must be an array"),
    body("pets").exists().withMessage("is required").isArray().withMessage("must be an array"),
    body("sharingAcceptable")
      .exists()
      .withMessage("is required")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("cannot be empty"),
    body("landlordComments").optional().isString().withMessage("must be a string"),
  ]),
];
