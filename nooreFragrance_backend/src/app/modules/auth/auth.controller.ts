// app/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { envVars } from "../../config/envVars";
import { TokenService } from "../../services/token.service";
import { AuthService } from "./auth.service";

const googleCallback = (req: Request, res: Response) => {
  const authData = req.user as any;

  if (authData && authData.accessToken && authData.refreshToken) {
    // Set ACCESS TOKEN as HTTP-only cookie (short-lived)
    res.cookie("access_token", authData.accessToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Set REFRESH TOKEN as HTTP-only cookie (long-lived)
    res.cookie("refresh_token", authData.refreshToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/v1/auth/refresh", // Only sent to refresh endpoint
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend
    res.redirect(`${envVars.APP_URL}/dashboard`);
  } else {
    res.redirect("/login");
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    const accessToken = req.cookies.access_token;

    // Get user ID from access token
    if (accessToken) {
      const decoded = TokenService.verifyAccessToken(accessToken);
      if (decoded && decoded.userId) {
        // Remove refresh token from database
        if (refreshToken) {
          await AuthService.logout(decoded.userId, refreshToken);
        }
      }
    }

    // Clear cookies
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/v1/auth/refresh",
    });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};

const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // Generate new access token
    const newAccessToken = await AuthService.refreshAccessToken(refreshToken);

    // Set new access token cookie
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.json({
      success: true,
      message: "Access token refreshed",
    });
  } catch (error: any) {
    console.error("Refresh token error:", error);
    res.status(403).json({
      success: false,
      message: error.message || "Failed to refresh token",
    });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Get fresh user data from database
    const freshUser = await AuthService.getCurrentUser(user.userId);

    if (!freshUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: freshUser,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user data",
    });
  }
};

export const AuthController = {
  googleCallback,
  logout,
  refreshAccessToken,
  getCurrentUser,
};