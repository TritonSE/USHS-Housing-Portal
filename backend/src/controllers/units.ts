import { RequestHandler } from "express";

import { asyncHandler } from "./wrappers";

import { NewUnit, createUnit, getUnits, FilterParams } from "@/services/units";

/**
 * Handle a request to create a new unit.
 */
export const createUnitsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const newUnitBody = req.body as NewUnit;

  const newUnit = await createUnit(newUnitBody);

  res.status(201).json(newUnit);
});

export const getUnitsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  console.log("requests");
  console.log(req.query);

  const units = await getUnits(req.query as FilterParams);

  res.status(200).json(units);
});
