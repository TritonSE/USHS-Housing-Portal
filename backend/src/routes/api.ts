import express from "express";

import referralRouter from "@/routes/referral";
import renterRouter from "@/routes/renter";
import unitsRouter from "@/routes/units";
import userRouter from "@/routes/user";

const router = express.Router();

// Register routers

router.use("/users", userRouter);
router.use("/units", unitsRouter);
router.use("/renter-candidates", renterRouter);
router.use("/referrals", referralRouter);

export default router;
