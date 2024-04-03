/**
 * Units router
 *
 * Path: /api/units/*
 */

import express from "express";

import * as UnitController from "@/controllers/units";
import { requireHousingLocator, requireUser } from "@/middleware/auth";
import { validateWith } from "@/middleware/validation";
import { createUnitValidators, updateUnitValidators } from "@/validators/units";

const router = express.Router();

router.get("/:id", requireUser, UnitController.getUnitHandler);

router.post("/", validateWith(createUnitValidators), UnitController.createUnitsHandler);
router.get("/", requireUser, UnitController.getUnitsHandler);

router.put("/:id", validateWith(updateUnitValidators), UnitController.updateUnitHandler); // TODO

router.delete("/:id", requireHousingLocator, UnitController.deleteUnitsHandler);

router.put("/:id/approve", requireHousingLocator, UnitController.approveUnitHandler);

router.get("/:id/referrals", requireUser, UnitController.getUnitReferralsHandler);
export default router;
