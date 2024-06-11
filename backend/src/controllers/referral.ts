import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { ObjectId } from "mongoose";

import { asyncHandler } from "./wrappers";

import {
  createReferral,
  deleteReferral,
  editReferral,
  getAllReferrals,
  getHousingLocatorReferrals,
} from "@/services/referral";

type CreateReferralRequestBody = {
  renterCandidateId: string;
  unit: string;
};

type EditReferralRequestBody = {
  id: string;
  housingLocator: string;
  referringStaff: string;
  status: string;
};

export const createReferralHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { renterCandidateId, unit } = req.body as CreateReferralRequestBody;

  const referringStaff = req.currentUser;
  const referringStaffID = referringStaff?._id as ObjectId;
  const isHL = referringStaff?.isHousingLocator ?? false;

  const referral = await createReferral(renterCandidateId, unit, referringStaffID, isHL);

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

export const deleteReferralHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const id = req.params.id;
  const response = await deleteReferral(id);
  if (response === null) {
    res.status(400);
  } else {
    res.status(200).json(response);
  }
});

export const getReferralsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const referrals = await getAllReferrals();

  res.status(200).json(referrals);
});

export const getHousingLocatorReferralsHandler: RequestHandler = asyncHandler(
  async (req, res, _) => {
    const { id } = req.params;

    const referrals = await getHousingLocatorReferrals(id);
    if (referrals === null) {
      throw createHttpError(404, "No referrals found.");
    }

    res.status(200).json(referrals);
  },
);

export const deleteHousingLocatorReferralHandler: RequestHandler = asyncHandler(
  async (req, res, _) => {
    const id = req.params.id;
    const response = await deleteReferral(id);
    if (response === null) {
      res.status(400);
    } else {
      res.status(200).json(response);
    }
  },
);
