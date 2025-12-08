import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { env } from "./env.js";
import { prisma } from "../lib/prisma.js";

const hasGoogleCreds = Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);

if (hasGoogleCreds) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID as string,
        clientSecret: env.GOOGLE_CLIENT_SECRET as string,
        callbackURL:
          env.OAUTH_CALLBACK_URL ?? "http://localhost:3001/auth/google/callback"
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(new Error("Google account has no email"), undefined);
          }

          const providerId = profile.id;

          let user = await prisma.user.findFirst({
            where: { provider: "GOOGLE", providerId }
          });

          if (!user) {
            const existingByEmail = await prisma.user.findUnique({ where: { email } });
            if (existingByEmail) {
              user = await prisma.user.update({
                where: { id: existingByEmail.id },
                data: { provider: "GOOGLE", providerId }
              });
            } else {
              user = await prisma.user.create({
                data: {
                  email,
                  name: profile.displayName || email.split("@")[0],
                  provider: "GOOGLE",
                  providerId
                }
              });
            }
          }

          return done(null, user);
        } catch (err) {
          return done(err as Error, undefined);
        }
      }
    )
  );
}

export { passport, hasGoogleCreds };
