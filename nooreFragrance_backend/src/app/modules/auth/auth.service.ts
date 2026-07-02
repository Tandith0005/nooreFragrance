// app/modules/auth/auth.service.ts
import { IUser, User } from "../../models";
import { TokenService } from "../../services/token.service";
import { Types } from "mongoose";
import { logger } from "../../utils/logger";
import AppError from "../../utils/appError";
import { IAuthResponse, IGoogleProfile, ILogoutPayload, IRefreshTokenPayload } from "./auth.types";

// Handle Google authentication
const handleGoogleAuth = async (profile: IGoogleProfile, req: any): Promise<IAuthResponse> => {
  try {
    const email = profile.emails?.[0]?.value;
    const googleId = profile.id;

    if (!email) {
      throw new AppError("No email found from Google", 400);
    }

    // 1. Check if user exists by email OR googleId
    let user = await User.findOne({
      $or: [{ email }, { googleId }],
    });

    if (!user) {
      // 2. Create NEW user
      const newUser = {
        googleId,
        name: profile.displayName,
        email,
        photo: profile.photos?.[0]?.value || "",
        role: "user" as const,
        isActive: true,
        refreshTokens: [],
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      user = await User.create(newUser as any);
      logger.log(`New user created: ${email}`);
    } else {
      // 3. Update EXISTING user
      const updateData: any = {
        lastLogin: new Date(),
      };

      // If user exists but doesn't have googleId (registered differently), add it
      if (!user.googleId && googleId) {
        updateData.googleId = googleId;
      }

      // Update name/photo if changed
      if (user.name !== profile.displayName)
        updateData.name = profile.displayName;
      if (user.photo !== profile.photos?.[0]?.value)
        updateData.photo = profile.photos?.[0]?.value;

      await User.updateOne({ _id: user._id }, { $set: updateData });

      // Refresh user object with updated data
      user = await User.findById(user._id);
      logger.log(`Existing user logged in: ${email}`);
    }

    if (!user) {
      throw new AppError("User not found after authentication", 400);
    }

    // 4. Generate JWT tokens
    const accessToken = TokenService.generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const refreshToken = TokenService.generateRefreshToken();

    // Store refresh token in database
    await TokenService.storeRefreshToken({
      userId: user._id.toString(),
      refreshToken,
      userAgent: req?.headers?.["user-agent"],
      ipAddress: req?.ip || req?.connection?.remoteAddress,
    });

    // Return user data and tokens
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error("Google Auth Error:", error);
    throw error;
  }
};

// Logout user
const logout = async ({userId, refreshToken} : ILogoutPayload): Promise<void> => {
  await User.updateOne(
    { _id: new Types.ObjectId(userId) },
    {
      $pull: {
        refreshTokens: { token: refreshToken },
      },
    },
  );
};

// Refresh access token
const refreshAccessToken = async ({refreshToken}: IRefreshTokenPayload): Promise<any> => {
  // Find user with valid refresh token
  const user = await User.findOne({
    "refreshTokens.token": refreshToken,
    "refreshTokens.expiresAt": { $gt: new Date() },
  });

  if (!user) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  // Verify refresh token is still valid
  const isValid = await TokenService.verifyRefreshToken({
    userId: user._id.toString(),
    refreshToken,
  });

  if (!isValid) {
    throw new AppError("Refresh token expired or invalid", 401);
  }

  // Generate new access token
  const newAccessToken = TokenService.generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  });

  return newAccessToken;
};

// Get current user
const getCurrentUser = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select("-refreshTokens");
};

export const AuthService = {
  handleGoogleAuth,
  logout,
  refreshAccessToken,
  getCurrentUser,
};
