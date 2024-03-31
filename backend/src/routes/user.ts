/**
 * User router
 *
 * Path: /api/users/*
 */

import express from "express";

import * as UserController from "@/controllers/user";
import { requireHousingLocator, requireUser } from "@/middleware/auth";
import { validateWith } from "@/middleware/validation";
import * as UserValidator from "@/validators/user";

const router = express.Router();

router.get("/", requireUser, UserController.getUsersHandler);

router.post("/", validateWith(UserValidator.createUser), UserController.createUserHandler);

router.put("/:id/elevate", requireHousingLocator, UserController.elevateUserHandler);

export default router;
