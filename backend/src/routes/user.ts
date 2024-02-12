/**
 * User router
 */

import express from "express";

import * as UserController from "@/controllers/user";
import { validateWith } from "@/middleware/validation";
import * as UserValidator from "@/validators/user";
import { requireHousingLocator } from "@/middleware/auth";

const router = express.Router();

router.get("/", UserController.getUsersHandler);

router.post("/", validateWith(UserValidator.createUser), UserController.createUserHandler);

router.put("/:id/elevate", UserController.elevateUserHandler);

export default router;
