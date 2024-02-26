import { RequestHandler } from "express";

import { asyncHandler } from "./wrappers";

import { NewUnit, createUnit, getUnits } from "@/services/units";

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

  // const search = req.query.search as string | undefined;
  // const availability = req.query.availability as string | undefined;
  // const minPrice = req.query.minPrice as string | undefined;
  // const maxPrice = req.query.maxPrice as string | undefined;
  // const bedrooms = req.query.bedrooms as string | undefined;
  // const baths = req.query.baths as string | undefined;

  // const filterParams: Record<string, any> = {};

  // if (minPrice && maxPrice) {
  //   filterParams.monthlyRent = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
  // } else if (minPrice) {
  //   filterParams.monthlyRent = { $gte: parseInt(minPrice) };
  // } else if (maxPrice) {
  //   filterParams.monthlyRent = { $lte: parseInt(maxPrice) };
  // }

  // const units = await getUnits(filterParams);
  const units = await getUnits();

  res.status(200).json(units);
});
