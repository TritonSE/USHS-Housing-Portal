import { RequestHandler } from "express";

import { asyncHandler } from "./wrappers";

import { createRenterCandidate, getRenterCandidates } from "@/services/renter";

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
