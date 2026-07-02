// app/config/passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envVars } from "./envVars";
import { AuthService } from "../modules/auth/auth.service";
import { logger } from "../utils/logger";
import { IGoogleProfile, IAuthResponse } from "../modules/auth/auth.types";
import { Profile } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID as string,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${envVars.AUTH_URL}/api/v1/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
        // Pass the request object through to the service
        const req = (done as any).req;

        // Handle the authentication
        const authData: IAuthResponse = await AuthService.handleGoogleAuth(
          profile as IGoogleProfile,
          req
        );

        return done(null, authData);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        return done(error as Error);
      }
    }
  )
);

export default passport;