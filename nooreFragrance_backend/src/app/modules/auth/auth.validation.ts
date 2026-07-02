import { z } from "zod";

// Refresh token validation
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

// Login validation (if I add email/password login later)
export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// User registration validation (if I add registration later)
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Logout validation 
export const logoutSchema = z.object({
  refreshToken: z.string().optional(),
});

// User update validation (if you need it)
export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email().optional(),
  photo: z.url().optional(),
});

// Export types from Zod schemas
export type TRefreshToken = z.infer<typeof refreshTokenSchema>;
export type TLogin = z.infer<typeof loginSchema>;
export type TRegister = z.infer<typeof registerSchema>;
export type TUpdateUser = z.infer<typeof updateUserSchema>;