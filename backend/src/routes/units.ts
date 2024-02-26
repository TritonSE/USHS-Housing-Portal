/**
 * Units router
 *
 * Path: /api/units/*
 */

import express from "express";

import * as UnitController from "@/controllers/units";
import { validateWith } from "@/middleware/validation";
import { createUnitValidators } from "@/validators/units";

const router = express.Router();

router.get("/:id", UnitController.getUnitHandler);

router.post("/", validateWith(createUnitValidators), UnitController.createUnitsHandler);

router.put("/:id/approve", UnitController.approveUnitHandler);

export default router;
