import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/login", passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});






export const AuthRoutes = router;