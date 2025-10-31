import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { publicRouter } from "./publicRoutes.js";
import { adminRouter } from "./adminRoutes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/", publicRouter);
router.use("/admin", adminRouter);

export const apiRouter = router;
