// app/middlewares/authorize.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Get user from request (set by authenticateJWT middleware)
      const user = req.user;

      // Check if user exists
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required. Please log in.",
        });
      }

      // Check if user has a role
      if (!user.role) {
        return res.status(403).json({
          success: false,
          message: "User role not found. Access denied.",
        });
      }

      // Check if user's role is allowed
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required roles: ${allowedRoles.join(", ")}. Your role: ${user.role}`,
        });
      }

      // User is authorized, proceed to next middleware/controller
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({
        success: false,
        message: "Authorization failed due to server error.",
      });
    }
  };
};
