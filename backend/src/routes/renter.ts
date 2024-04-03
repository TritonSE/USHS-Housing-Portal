/**
 * Renter Candidates Router
 *
 * Path: /api/renter-candidates/*
 */

import express from "express";

import * as RenterController from "@/controllers/renter";
import { requireUser } from "@/middleware/auth";
import { validateWith } from "@/middleware/validation";
import * as RenterValidator from "@/validators/renter";

const router = express.Router();

router.get("/", requireUser, RenterController.getRenterCandidatesHandler);

router.post(
  "/",
  requireUser,
  validateWith(RenterValidator.createRenterCandidate),
  RenterController.createRenterCandidateHandler,
);

export default router;
