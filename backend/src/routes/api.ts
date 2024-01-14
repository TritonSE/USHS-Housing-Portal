import express from "express";

import userRouter from "@/routes/user";

const router = express.Router();

// Register routers
router.use("/users", userRouter);

export default router;
