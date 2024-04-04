import { RequestHandler } from "express";
import { ObjectId } from "mongoose";

import { asyncHandler } from "./wrappers";

import { createReferral, editReferral } from "@/services/referral";

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

  const referringStaff = req.currentUser;
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