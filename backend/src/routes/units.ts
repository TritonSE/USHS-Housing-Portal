/**
 * User router
 */

import express from "express";

import * as UnitController from "@/controllers/units";

const router = express.Router();

router.post("/units", UnitController.createUnitsHandler);

export default router;
