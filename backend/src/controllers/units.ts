import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { createUnitValidators } from "@/validators/units";
import createHttpError from "http-errors";

import { asyncHandler } from "./wrappers";

import { UnitModel } from "@/models/units";
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

/**
 * Handle a request to update a unit.
 */
export const updateUnitHandler: RequestHandler = async (req, res, next) => {
  try {
    if (req.params.id != req.body._id) {
      res.status(400);
    }

    const id = req.params.id;
    const updatedUnit = await UnitModel.findByIdAndUpdate(id, req.body);

    if (updatedUnit === null) {
      throw createHttpError(404, "Unit not found.");
    }

    res.status(200).json(updatedUnit);
  } catch (error) {
    next(error);
  }
};
