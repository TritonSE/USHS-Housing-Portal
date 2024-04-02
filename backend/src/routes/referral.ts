import express from "express";

import { createReferralHandler } from "@/controllers/referral";
import { requireUser } from "@/middleware/auth";

const router = express.Router();

router.post("/", requireUser, createReferralHandler);

export default router;
