import { RequestHandler } from "express";

import { asyncHandler } from "./wrappers";

import { NewUnit, createUnit, deleteUnit } from "@/services/units";

/**
 * Handle a request to create a new unit.
 */
export const createUnitsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const newUnitBody = req.body as NewUnit;

  const newUnit = await createUnit(newUnitBody);

  res.status(201).json(newUnit);
});

export const deleteUnitsHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const id = req.params.id;
  const response = await deleteUnit(id);
  if (response === null) {
    res.status(400);
  } else {
    res.status(200).json(response);
  }
});
