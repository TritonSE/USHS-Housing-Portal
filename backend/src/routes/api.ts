import express from "express";

import env from "@/config/env";
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

router.post("/check-form-password", (req, res) => {
  const { password } = req.body as { password: string };
  if (password === env.LANDLORD_FORM_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

export default router;
