import express from "express";

import { createReferralHandler, editReferralHandler } from "@/controllers/referral";
import { requireUser } from "@/middleware/auth";

const router = express.Router();

router.post("/", requireUser, createReferralHandler);

router.put("/:id", requireUser, editReferralHandler);

export default router;
