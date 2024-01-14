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
  name: string;
  email: string;
};

export const createUserHandler: RequestHandler = (req, res, _) => {
  const { name, email } = req.body as CreateUserRequestBody;

  createUser();

  res.status(200).json({ user: { name, email } });
};
