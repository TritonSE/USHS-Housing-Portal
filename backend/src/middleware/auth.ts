import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { asyncHandler } from "@/controllers/wrappers";
import * as firebaseAdmin from "@/firebase-admin";
import { UserModel } from "@/models/user";

const requireUser: RequestHandler = asyncHandler(async (req, res, next) => {
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

const requireHousingLocator: RequestHandler = (req, res, next) => {
  requireUser(req, res, () => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
    if (req.body.currentUser.isHousingLocator) {
      next();
    } else {
      res.status(401).send({ message: "Housing Locators only " });
    }
  });
};

export { requireUser, requireHousingLocator };
