/**
 * User router
 */

import express from "express";

import * as UserController from "@/controllers/user";
import { validateWith } from "@/middleware/validation";
import * as UserValidator from "@/validators/user";

const router = express.Router();

router.get("/:id", validateWith(UserValidator.getUser), UserController.getUserHandler);

router.post("/", validateWith(UserValidator.createUser), UserController.createUserHandler);

export default router;
