/**
 * User router
 *
 * Path: /api/users/*
 */

import express from "express";

import * as UserController from "@/controllers/user";
import { validateWith } from "@/middleware/validation";
import * as UserValidator from "@/validators/user";

const router = express.Router();

router.get("/", UserController.getUsersHandler);

router.post("/", validateWith(UserValidator.createUser), UserController.createUserHandler);

export default router;
