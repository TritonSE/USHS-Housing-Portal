import express, { RequestHandler } from "express";

import renterRouter from "@/routes/renter";
import userRouter from "@/routes/user";

const router = express.Router();

// Register routers
router.use("/users", userRouter as RequestHandler);

router.use("/renter-candidates", renterRouter as RequestHandler);

export default router;
