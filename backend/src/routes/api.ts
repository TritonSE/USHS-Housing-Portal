import express from "express";

import userRouter from "@/routes/user";

const router = express.Router();

// Register routers
router.use("/user", userRouter);

export default router;
