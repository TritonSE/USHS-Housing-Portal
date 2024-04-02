import { RequestHandler } from "express";
import { ObjectId } from "mongodb";

import { asyncHandler } from "./wrappers";

import { createReferral } from "@/services/referral";
import { getUserByEmail } from "@/services/user";

type CreateReferralRequestBody = {
  renterCandidateId: string;
  unitId: string;
};
export const createReferralHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { renterCandidateId, unitId } = req.body as CreateReferralRequestBody;

  //can't access the _id field directly from req.current user for some reason
  const referringStaff = await getUserByEmail(req.currentUser.email);
  const referringStaffID = referringStaff?._id as ObjectId;

  const referral = await createReferral(renterCandidateId, unitId, referringStaffID);

  if (referral !== null) {
    res.status(201).json(referral);
  } else {
    res.status(400).send("User Already Exists");
  }
});
