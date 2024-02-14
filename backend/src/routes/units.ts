/**
 * User router
 */

import express from "express";

import * as UnitController from "@/controllers/units";

const router = express.Router();

console.log("at units router");
router.post("/", UnitController.createUnitsHandler);

export default router;
