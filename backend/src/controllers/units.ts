import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { asyncHandler } from "./wrappers";

import { UnitModel } from "@/models/units";
import { getUnitReferrals } from "@/services/referral";
import { NewUnit, createUnit } from "@/services/units";

/**
 * Handle a request to create a new unit.
 */
export const createUnitsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const newUnitBody = req.body as NewUnit;

  const newUnit = await createUnit(newUnitBody);

  res.status(201).json(newUnit);
});

/**
 * Handle a request to get a unit.
 */
export const getUnitHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { id } = req.params;

  // Fetch the unit data based on the unitId
  const unit = await UnitModel.findById(id);

  if (unit === null) {
    throw createHttpError(404, "Unit not found.");
  }

  res.status(200).json(unit);
});

export const getUnitReferralsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { id } = req.params;

  const referrals = await getUnitReferrals(id);
  if (referrals === null) {
    throw createHttpError(404, "No referrals found.");
  }

  res.status(200).json(referrals);
});
