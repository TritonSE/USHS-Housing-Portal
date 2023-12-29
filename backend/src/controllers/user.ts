/**
 * Functions that process user route requests.
 */

import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { asyncHandler } from "./wrappers";

import { createUser, getUser } from "@/services/user";

export const getUserHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { id } = req.params;

  const user = await getUser(id);

  if (user === null) {
    throw createHttpError(404, "User not found.");
  }

  res.status(200).json(user);
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
