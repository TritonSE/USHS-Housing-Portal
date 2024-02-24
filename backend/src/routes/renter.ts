import express from "express";

import * as RenterController from "@/controllers/renter";
import { validateWith } from "@/middleware/validation";
import * as RenterValidator from "@/validators/renter";

const router = express.Router();

router.get("/", RenterController.getRenterCandidatesHandler);

router.post(
  "/",
  validateWith(RenterValidator.createRenterCandidate),
  RenterController.createRenterCandidateHandler,
);

export default router;
