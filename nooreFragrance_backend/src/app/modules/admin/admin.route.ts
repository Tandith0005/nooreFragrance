import { Router } from "express";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

// Only admins can manually trigger cleanup
router.post(
  "/cleanup-tokens",
  authenticateJWT,
  authorizeRoles("admin"),
  AdminController.triggerTokenCleanup,
);

export const AdminRoutes = router;
