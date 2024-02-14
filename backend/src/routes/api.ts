import express from "express";

import userRouter from "@/routes/user";
import unitsRouter from "@/routes/units";

const router = express.Router();

// Register routers
router.use("/users", userRouter);
router.use("/units", unitsRouter);

export default router;
