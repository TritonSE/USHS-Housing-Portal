/**
 * Units router
 */

import express from "express";

import * as UnitController from "@/controllers/units";
import { requireHousingLocator } from "@/middleware/auth";
import { validateWith } from "@/middleware/validation";
import { createUnitValidators } from "@/validators/units";

const router = express.Router();

router.post("/", validateWith(createUnitValidators), UnitController.createUnitsHandler);

router.delete("/:id", requireHousingLocator, UnitController.deleteUnitsHandler);

export default router;
