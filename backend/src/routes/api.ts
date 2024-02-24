import express from "express";

import renterRouter from "@/routes/renter";
import unitsRouter from "@/routes/units";
import userRouter from "@/routes/user";

const router = express.Router();

// Register routers

router.use("/users", userRouter);
router.use("/units", unitsRouter);
router.use("/renter-candidates", renterRouter);

export default router;
