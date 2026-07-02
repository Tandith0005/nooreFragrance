import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { AdminRoutes } from "../modules/admin/admin.route";

const router = Router();

// Auth Routes
router.use("/auth", AuthRoutes);
router.use("/admin", AdminRoutes);


export const IndexRoutes = router;