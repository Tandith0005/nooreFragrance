import { Document } from "mongoose";
import { IRefreshToken } from "./token.types";

export enum Role {
  USER = "user",
  SELLER = "seller",
  ADMIN = "admin",
}
export interface IUser extends Document {
  googleId?: string;
  name: string;
  email: string;
  password?: string;
  photo?: string;
  role: Role;
  isActive: boolean;
  refreshTokens: IRefreshToken[];
  lastLogin: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}
