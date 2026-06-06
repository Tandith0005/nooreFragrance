import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envVars } from "./envVars";


passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID as string,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET as string,
      callbackURL:
        `${envVars.AUTH_URL}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // later save user in mongodb

        const user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          photo: profile.photos?.[0]?.value,
        };

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

export default passport;