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
  contactInfo: string;
  program?: string;
};

export const createRenterCandidateHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { firstName, lastName, contactInfo, program } =
    req.body as CreateRenterCandidateRequestBody;

  let response;
  if (typeof program !== "undefined") {
    response = await createRenterCandidate(firstName, lastName, contactInfo, program);
  } else {
    response = await createRenterCandidate(firstName, lastName, contactInfo);
  }

  if (response !== null) {
    if (typeof program !== "undefined") {
      res.status(200).json({ renter: { firstName, lastName, contactInfo, program } });
    } else {
      res.status(200).json({ renter: { firstName, lastName, contactInfo } });
    }
  } else {
    res.status(400).send("Renter Already Exists");
  }
});
