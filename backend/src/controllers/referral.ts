import { RequestHandler } from "express";
import { ObjectId } from "mongodb";

import { asyncHandler } from "./wrappers";

import { createReferral, editReferral } from "@/services/referral";
import { getUserByEmail } from "@/services/user";

type CreateReferralRequestBody = {
  renterCandidateId: string;
  unitId: string;
};

type EditReferralRequestBody = {
  id: string;
  housingLocator: string;
  referringStaff: string;
  status: string;
};

export const createReferralHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { renterCandidateId, unitId } = req.body as CreateReferralRequestBody;

  //can't access the _id field directly from req.current user for some reason
  const referringStaff = await getUserByEmail(req.currentUser.email);
  const referringStaffID = referringStaff?._id as ObjectId;
  const isHL = referringStaff?.isHousingLocator ?? false;

  const referral = await createReferral(renterCandidateId, unitId, referringStaffID, isHL);

  if (referral !== null) {
    res.status(201).json(referral);
  } else {
    res.status(400);
  }
});

export const editReferralHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const id = req.params.id;
  const { housingLocator, referringStaff, status } = req.body as EditReferralRequestBody;
  const response = await editReferral(id, housingLocator, referringStaff, status);
  if (response !== null) {
    res.status(200).json(response);
  } else {
    res.status(400);
  }
});
