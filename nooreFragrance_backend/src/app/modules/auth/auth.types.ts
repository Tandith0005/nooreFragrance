// app/modules/auth/auth.types.ts
import { Types } from "mongoose";
import { IUser } from "../../models";


// Google Profile Type
export interface IGoogleProfile {
  id: string;
  displayName: string;
  emails?: Array<{ value: string; verified?: boolean }>;
  photos?: Array<{ value: string }>;
  provider: string;
  _json?: any;
}

// Auth Tokens Response
export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Auth User Response
export interface IAuthUserResponse {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: string;
  photo?: string;
}

// Auth Response (full response from Google auth)
export interface IAuthResponse {
  user: IAuthUserResponse;
  accessToken: string;
  refreshToken: string;
}

// Refresh Token Response
export interface IRefreshTokenResponse {
  accessToken: string;
}

// Logout Response
export interface ILogoutResponse {
  success: boolean;
  message: string;
}

// Current User Response
export interface ICurrentUserResponse {
  user: IUser | null;
}

// Refresh Token Payload (for service)
export interface IRefreshTokenPayload {
  refreshToken: string;
}

// Logout Payload (for service)
export interface ILogoutPayload {
  userId: string;
  refreshToken: string;
}

// Google Auth Payload (for service)
export interface IGoogleAuthPayload {
  profile: IGoogleProfile;
  req: any;
}

// Token Service Response Types
export interface IStoreRefreshTokenPayload {
  userId: string;
  refreshToken: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface IVerifyRefreshTokenPayload {
  userId: string;
  refreshToken: string;
}

export interface IRemoveRefreshTokenPayload {
  userId: string;
  refreshToken: string;
}