import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { asyncHandler } from "./wrappers";

import {
  createRenterCandidate,
  editRenterCandidate,
  getRenterCandidate,
  getRenterCandidates,
} from "@/services/renter";

export const getRenterCandidatesHandler: RequestHandler = asyncHandler(async (_req, res, _next) => {
  const renters = await getRenterCandidates();

  res.status(200).json(renters);
});

type CreateRenterCandidateRequestBody = {
  firstName: string;
  lastName: string;
  uid: string;
  program: string;
  adults: number;
  children: number;
  phone?: string;
  email?: string;
};

type EditRenterCandidateRequestBody = Partial<CreateRenterCandidateRequestBody>;

export const createRenterCandidateHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { firstName, lastName, uid, program, adults, children, phone, email } =
    req.body as CreateRenterCandidateRequestBody;

  const response = await createRenterCandidate(
    firstName,
    lastName,
    uid,
    program,
    adults,
    children,
    phone,
    email,
  );

  if (response !== null) {
    res.status(200).json(response);
  } else {
    res.status(400).send("Renter Already Exists");
  }
});

export const getRenterCandidateHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { id } = req.params;

  // Fetch the renter candidate data based on the renterId
  const body = await getRenterCandidate(id);

  if (body === null) {
    throw createHttpError(404, "Renter not found.");
  }

  res.status(200).json(body);
});

export const editRenterCandidateHandler: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const editQuery = req.body as EditRenterCandidateRequestBody;

  const result = await editRenterCandidate(id, editQuery);

  if (result === null) {
    res.status(404);
  } else {
    res.status(200).json(result);
  }
});
