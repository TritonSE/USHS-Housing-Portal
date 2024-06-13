import express from "express";

import * as ReferralController from "../controllers/referral";
import { requireUser } from "../middleware/auth";

const router = express.Router();

router.post("/", requireUser, ReferralController.createReferralHandler);

router.get("/", requireUser, ReferralController.getReferralsHandler);

router.put("/:id", requireUser, ReferralController.editReferralHandler);

router.delete("/:id", requireUser, ReferralController.deleteReferralHandler);

export default router;
