import { RequestHandler } from "express";

import { asyncHandler } from "./wrappers";

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
 * Handle a request to approve a unit.
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
