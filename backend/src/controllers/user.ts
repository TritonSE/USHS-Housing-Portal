/**
 * Functions that process user route requests.
 */

import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { getUser, createUser } from "@/services/user";

export const getUserHandler: RequestHandler = async (req, res, _) => {
  const { id } = req.params;

  const user = await getUser(id);

  if (user === null) {
    throw createHttpError(404, "User not found.");
  }

  res.status(200).json(user);
};

export const createUserHandler: RequestHandler = async (req, res, next) => {
  const { name, email } = req.body;

  await createUser();

  res.status(200).json({ user: { name, email } });
};
