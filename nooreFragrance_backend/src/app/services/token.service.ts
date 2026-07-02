// app/services/token.service.ts
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { envVars } from "../config/envVars";
import { Types } from "mongoose"; 
import {
  IAccessTokenPayload,
  IremoveRefreshTokenPayload,
  IstoreRefreshTokenPayload,
  IverifyRefreshTokenPayload,
} from "./token.interface";
import { User } from "../models";

export class TokenService {
  // Generate Access Token (short-lived)
  static generateAccessToken(user: IAccessTokenPayload): string {
    return jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role,
        // photo removed as requested
        type: "access",
      },
      envVars.JWT_SECRET as string,
      { expiresIn: "15m" }, // 15 minutes
    );
  }

  // Generate Refresh Token (long-lived, stored in DB)
  static generateRefreshToken(): string {
    return crypto.randomBytes(40).toString("hex");
  }

  // Store refresh token in database
  static async storeRefreshToken({
    userId,
    refreshToken,
    userAgent,
    ipAddress,
  }: IstoreRefreshTokenPayload): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await User.updateOne(
      { _id: new Types.ObjectId(userId) }, // Use Types.ObjectId
      {
        $push: {
          refreshTokens: {
            token: refreshToken,
            createdAt: new Date(),
            expiresAt: expiresAt,
            userAgent: userAgent,
            ipAddress: ipAddress,
          },
        },
      },
    );
  }

  // Verify refresh token from database
  static async verifyRefreshToken({
    userId,
    refreshToken,
  }: IverifyRefreshTokenPayload): Promise<boolean> {
    const user = await User.findOne(
      {
        _id: new Types.ObjectId(userId), 
        "refreshTokens.token": refreshToken,
        "refreshTokens.expiresAt": { $gt: new Date() },
      },
      { refreshTokens: 1 } // Mongoose select syntax
    );

    return !!user;
  }

  // Remove refresh token (logout)
  static async removeRefreshToken({
    userId,
    refreshToken,
  }: IremoveRefreshTokenPayload): Promise<void> {
    await User.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $pull: {
          refreshTokens: { token: refreshToken },
        },
      },
    );
  }

  // Remove all refresh tokens (logout from all devices)
  static async removeAllRefreshTokens(userId: string): Promise<void> {
    await User.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $set: { refreshTokens: [] },
      },
    );
  }

  // Clean up expired refresh tokens
  static async cleanupExpiredTokens(): Promise<void> {
    await User.updateMany(
      {},
      {
        $pull: {
          refreshTokens: { expiresAt: { $lt: new Date() } },
        },
      },
    );
  }

  // Verify Access Token
  static verifyAccessToken(token: string): any {
    try {
      return jwt.verify(token, envVars.JWT_SECRET as string);
    } catch (error) {
      return null;
    }
  }
}