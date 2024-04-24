import express from "express";

import emailRouter from "@/routes/email";
import renterRouter from "@/routes/renter";
import unitsRouter from "@/routes/units";
import userRouter from "@/routes/user";

const router = express.Router();

// Register routers

router.use("/users", userRouter);
router.use("/units", unitsRouter);
router.use("/renter-candidates", renterRouter);
router.use("/send-email", emailRouter);

export default router;
