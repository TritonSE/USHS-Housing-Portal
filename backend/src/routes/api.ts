import express from "express";

import unitsRouter from "@/routes/units";
import userRouter from "@/routes/user";

const router = express.Router();

// Register routers
router.use("/users", userRouter);
router.use("/units", unitsRouter);

export default router;
