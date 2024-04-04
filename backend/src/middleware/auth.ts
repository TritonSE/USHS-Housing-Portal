import { RequestHandler } from "express";

import { asyncHandler } from "@/controllers/wrappers";
import * as firebaseAdmin from "@/firebase-admin";
import { getUserByEmail } from "@/services/user";

// Try to parse the auth token and load the user into the request
// No errors are thrown if the token is invalid or the user is not found
// It is up to following middleware to decide how to handle error cases
const parseTokenAndLoadUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    token = authHeader.split(" ")[1];
  } else {
    next();
    return;
  }

  const decodedToken = await firebaseAdmin.firebaseAuth.verifyIdToken(token);
  const email = decodedToken.email;

  const user = await getUserByEmail(email ?? " ");
  if (user === null) {
    console.error(`Error finding user: ${email ?? ""}`);
  }

  req.currentUser = user;

  next();
});

// Require a request to have a valid auth token and valid user
export const requireUser: RequestHandler = (req, res, next) => {
  parseTokenAndLoadUser(req, res, () => {
    if (req.currentUser) {
      next();
    } else {
      res.status(401).send({ message: "Authorization Required" });
    }
  });
};

// Try to load a user from the auth token (if provided), but don't require it
export const optionalUser: RequestHandler = parseTokenAndLoadUser;

// Require a request to be made by a housing locator
export const requireHousingLocator: RequestHandler = (req, res, next) => {
  requireUser(req, res, () => {
    if (req.currentUser?.isHousingLocator) {
      next();
    } else {
      res.status(401).send({ message: "You must be a Housing Locator to make this request." });
    }
  });
};
