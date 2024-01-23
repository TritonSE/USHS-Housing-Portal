/**
 * Functions that process user route requests.
 */

import { RequestHandler } from "express";

import { asyncHandler } from "./wrappers";

import { createUser, getUsers } from "@/services/user";

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

  const response = createUser(firstName, lastName, email);

  response !== null
    ? res.status(200).json({ user: { firstName, lastName, email } })
    : res.status(400).send("User Already Exists");
});
