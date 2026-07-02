// app/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/token.service";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get token from cookie
  const token = req.cookies.access_token;
  
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  try {
    const decoded = TokenService.verifyAccessToken(token);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};