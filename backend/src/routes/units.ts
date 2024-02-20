import express from "express";
// import * as UnitController from "src/controllers/units";

const router = express.Router();

router.get("/units/:id", UnitController.getUnit);

export default router;
