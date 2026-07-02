import mongoose, { Schema } from "mongoose";
import { IRefreshToken } from "../types/token.types";
import { IUser, Role } from "../types/user.types";

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    photo: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshTokens: {
      type: [RefreshTokenSchema],
      default: [],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// helpful index for refresh token, googleId & email lookup
UserSchema.index({ "refreshTokens.token": 1 });
UserSchema.index({ "refreshTokens.expiresAt": 1 });
UserSchema.index({ googleId: 1 }, { unique: true, sparse: true });
UserSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model<IUser>("User", UserSchema);