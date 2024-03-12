/**
 * Units router
 *
 * Path: /api/units/*
 */

import express from "express";

import * as UnitController from "@/controllers/units";
import { requireHousingLocator } from "@/middleware/auth";
import { validateWith } from "@/middleware/validation";
import { approveUnitValidators, createUnitValidators } from "@/validators/units";

const router = express.Router();

router.get("/:id", UnitController.getUnitHandler);

router.post("/", validateWith(createUnitValidators), UnitController.createUnitsHandler);

router.put(
  "/:id/approve",
  requireHousingLocator,
  validateWith(approveUnitValidators),
  UnitController.approveUnitHandler,
);

export default router;
