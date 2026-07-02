import { Router } from "express";
import passport from "passport";
import { AuthController } from "./auth.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";


const router = Router();

// Passport google login
router.get("/login", passport.authenticate('google', { scope: ['email', 'profile'], session: false }));
router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login', session: false }), AuthController.googleCallback);

// Protected routes
router.post("/logout", authenticateJWT, AuthController.logout);
router.get("/me", authenticateJWT, AuthController.getCurrentUser);
router.post("/refresh", AuthController.refreshAccessToken); 


export const AuthRoutes = router;