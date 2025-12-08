import { Router, type Response } from "express";
import { hasGoogleCreds, passport } from "../../config/passport.js";
import { sendAuthRedirect } from "./utils.js";

export const googleRouter = Router();

function ensureConfigured(res: Response) {
  if (!hasGoogleCreds) {
    res.status(503).json({ error: "Google OAuth not configured" });
    return false;
  }
  return true;
}

googleRouter.get(
  "/google",
  (req, res, next) => {
    if (!ensureConfigured(res)) return;
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      prompt: "select_account"
    })(req, res, next);
  }
);

googleRouter.get(
  "/google/callback",
  (req, res, next) => {
    if (!ensureConfigured(res)) return;
    passport.authenticate("google", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: "Google auth failed" });
      }
      return sendAuthRedirect(res, {
        id: user.id,
        email: user.email,
        provider: user.provider,
        name: user.name
      });
    })(req, res, next);
  }
);
