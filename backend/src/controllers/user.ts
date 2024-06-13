/**
 * Functions that process user route requests.
 */

import { RequestHandler } from "express";

import { asyncHandler } from "./wrappers";

import { getReferralsForUser } from "@/services/referral";
import { createUser, demoteUser, elevateUser, getUserByID, getUsers } from "@/services/user";

export const getUsersHandler: RequestHandler = asyncHandler(async (_req, res, _next) => {
  const users = await getUsers();

  res.status(200).json(users);
});

type CreateUserRequestBody = {
  firstName: string;
  lastName: string;
  email: string;
};

export const createUserHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { firstName, lastName, email } = req.body as CreateUserRequestBody;

  const response = await createUser(firstName, lastName, email);

  if (response !== null) {
    res.status(200).json({ user: { firstName, lastName, email } });
  } else {
    res.status(400).send("User Already Exists");
  }
});

export const elevateUserHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const id = req.params.id;
  const response = await elevateUser(id);
  if (response === null) {
    res.status(404);
  } else {
    const newUser = await getUserByID(id);
    res.status(200).json(newUser);
  }
});

export const demoteUserHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const id = req.params.id;
  const response = await demoteUser(id);
  if (response === null) {
    res.status(404);
  } else {
    const demotedUser = await getUserByID(id);
    res.status(200).json(demotedUser);
  }
});

export const getUserReferrals: RequestHandler = asyncHandler(async (req, res, _) => {
  const id = req.params.id;

  const referrals = await getReferralsForUser(id);

  if (referrals === null) {
    res.status(404);
    return;
  }

  res.status(200).json(referrals);
});
