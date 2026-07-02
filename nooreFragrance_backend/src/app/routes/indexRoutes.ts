import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

// Auth Routes
router.use("/auth", AuthRoutes);


export const IndexRoutes = router;