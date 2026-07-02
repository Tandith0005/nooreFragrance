// app/config/passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envVars } from "./envVars";
import { AuthService } from "../modules/auth/auth.service";
import { logger } from "../utils/logger";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID as string,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${envVars.AUTH_URL}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Pass the request object through to the service
        const req = (done as any).req;
        
        // handle the authentication
        const authData = await AuthService.handleGoogleAuth(profile, req);
        
        return done(null, authData);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        return done(error as Error);
      }
    }
  )
);

export default passport;