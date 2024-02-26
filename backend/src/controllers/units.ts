import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { asyncHandler } from "./wrappers";

import { UnitModel } from "@/models/units";
import { NewUnit, approveUnit, createUnit } from "@/services/units";

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

/**
 * Handle a request to get all units.
 */
export const approveUnitHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const unitId = req.params.id;
  console.log(unitId);

  const unit = await approveUnit(unitId);

  if (unit !== null) {
    res.status(200).json(unit);
  } else {
    res.status(404).send("Unit not found");
  }
});
