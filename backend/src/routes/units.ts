/**
 * Units router
 *
 * Path: /api/units/*
 */

import express from "express";

import * as UnitController from "@/controllers/units";
import { requireHousingLocator } from "@/middleware/auth";
import { validateWith } from "@/middleware/validation";
import { createUnitValidators } from "@/validators/units";

const router = express.Router();

router.get("/:id", UnitController.getUnitHandler);

router.post("/", validateWith(createUnitValidators), UnitController.createUnitsHandler);
router.get("/", UnitController.getUnitsHandler);

router.put("/:id", requireHousingLocator, UnitController.getUnitHandler);
router.put("/:id/approve", requireHousingLocator, UnitController.getUnitHandler);

router.delete("/:id", requireHousingLocator, UnitController.deleteUnitsHandler);

export default router;
