import { Request, Response, NextFunction } from "express";
import { envVars } from "../../config/envVars";
import { TokenService } from "../../services/token.service";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IAuthResponse } from "./auth.types";

// Google Callback
const googleCallback = (req: Request, res: Response) => {
  const authData = req.user as IAuthResponse;

  if (authData && authData.accessToken && authData.refreshToken) {
    res.cookie("access_token", authData.accessToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", authData.refreshToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/v1/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${envVars.APP_URL}/dashboard`);
  }

  res.redirect("/login");
};

// Logout
const logout = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;
  const accessToken = req.cookies.access_token;

  if (accessToken) {
    const decoded = TokenService.verifyAccessToken(accessToken);
    if (decoded?.userId && refreshToken) {
      await AuthService.logout({
        userId: decoded.userId,
        refreshToken,
      });
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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged out successfully",
  });
});

// Refresh Access Token
const refreshAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Refresh token not found",
    });
  }

  const newAccessToken = await AuthService.refreshAccessToken(refreshToken);

  res.cookie("access_token", newAccessToken, {
    httpOnly: true,
    secure: envVars.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Access token refreshed successfully",
  });
});

// Get Current User
const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Not authenticated",
    });
  }

  const freshUser = await AuthService.getCurrentUser(user.userId);

  if (!freshUser) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "User not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User fetched successfully",
    data: freshUser,
  });
});

export const AuthController = {
  googleCallback,
  logout,
  refreshAccessToken,
  getCurrentUser,
};
