/**
 * Functions that process user route requests.
 */

import { RequestHandler } from "express";

import { asyncHandler } from "./wrappers";

import { createUser, elevateUser, getUserByID, getUsers } from "@/services/user";

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
