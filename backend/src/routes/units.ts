/**
 * Units router
 *
 * Path: /api/units/*
 */

import express from "express";

import * as UnitController from "@/controllers/units";
import { requireUser } from "@/middleware/auth";
import { validateWith } from "@/middleware/validation";
import { createUnitValidators } from "@/validators/units";

const router = express.Router();

router.get("/:id", UnitController.getUnitHandler);

router.post("/", validateWith(createUnitValidators), UnitController.createUnitsHandler);

router.get("/:id/referrals", requireUser, UnitController.getUnitReferralsHandler);
export default router;
