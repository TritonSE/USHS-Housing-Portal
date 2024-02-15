/**
 * User router
 */

import express from "express";

import * as UnitController from "@/controllers/units";
import { validateWith } from "@/middleware/validation";
import { createUnitValidators } from "@/validators/units";

const router = express.Router();

router.post("/", validateWith(createUnitValidators), UnitController.createUnitsHandler);

export default router;
