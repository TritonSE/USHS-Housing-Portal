import express from "express";

import {
  createReferralHandler,
  deleteReferralHandler,
  editReferralHandler,
} from "@/controllers/referral";
import { requireUser } from "@/middleware/auth";

const router = express.Router();

router.post("/", requireUser, createReferralHandler);

router.put("/:id", requireUser, editReferralHandler);

router.delete("/:id", requireUser, deleteReferralHandler);

export default router;
