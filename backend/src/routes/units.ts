/**
 * Units router
 *
 * Path: /api/units/*
 */

import express from "express";

import * as UnitController from "@/controllers/units";
import { requireHousingLocator, requireUser } from "@/middleware/auth";
import { validateWith } from "@/middleware/validation";
import { createUnitValidators } from "@/validators/units";

const router = express.Router();

router.get("/:id", requireUser, UnitController.getUnitHandler);

router.post("/", validateWith(createUnitValidators), UnitController.createUnitsHandler);
router.get("/", requireUser, UnitController.getUnitsHandler);

router.delete("/:id", requireHousingLocator, UnitController.deleteUnitsHandler);

router.put("/:id/approve", requireHousingLocator, UnitController.approveUnitHandler);

export default router;
