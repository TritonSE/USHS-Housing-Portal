import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { asyncHandler } from "./wrappers";

import { UnitModel } from "@/models/units";
import { deleteUnitReferrals, getUnitReferrals } from "@/services/referral";
import {
  EditUnitBody,
  FilterParams,
  NewUnitBody,
  approveUnit,
  createUnit,
  deleteUnit,
  exportUnits,
  getUnits,
  updateUnit,
} from "@/services/units";

/**
 * Handle a request to create a new unit.
 */
export const createUnitsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const newUnitBody = req.body as NewUnitBody;

  const isHL = req.currentUser?.isHousingLocator ?? false;

  const newUnit = await createUnit(newUnitBody, isHL);

  res.status(201).json(newUnit);
});

export const deleteUnitsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const id = req.params.id;
  const response = await deleteUnit(id);
  if (response === null) {
    res.status(400);
  }
  const referral = await deleteUnitReferrals(id);
  if (referral === null) {
    res.status(400);
  }

  res.status(200).json(response);
});

export const getUnitsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const units = await getUnits(req.query as FilterParams);

  res.status(200).json(units);
});

export const exportUnitsHandler: RequestHandler = asyncHandler(async (_req, res, _) => {
  const workbookBuffer = await exportUnits();

  res.statusCode = 200;
  res.setHeader("Content-Disposition", 'attachment; filename="ushs-data-export.xlsx"');
  res.setHeader("Content-Type", "application/vnd.ms-excel");
  res.end(workbookBuffer);
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

/**
 * Handle a request to update a unit.
 */
export const updateUnitHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const editUnitBody = req.body as EditUnitBody;

  const id = req.params.id;
  const updatedUnit = await updateUnit(id, editUnitBody);

  if (updatedUnit === null) {
    throw createHttpError(404, "Unit not found.");
  }

  res.status(200).json(updatedUnit);
});

export const getUnitReferralsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { id } = req.params;

  const referrals = await getUnitReferrals(id);
  if (referrals === null) {
    throw createHttpError(404, "No referrals found.");
  }

  res.status(200).json(referrals);
});

/**
 * Handle a request to approve a unit listing.
 */
export const approveUnitHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const unitId = req.params.id;

  const unit = await approveUnit(unitId);

  if (unit !== null) {
    res.status(200).json(unit);
  } else {
    res.status(404).send("Unit not found");
  }
});
