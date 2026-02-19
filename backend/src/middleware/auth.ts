import type { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { verifyAccessToken, type JwtPayload } from "../lib/jwt.js";

type AuthedRequest = Request & {
  auth?: JwtPayload;
};

function readBearerToken(req: Request) {
  const header = req.header("authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = readBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = verifyAccessToken(token);
    (req as AuthedRequest).auth = payload;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid access token" });
  }
}

export function requireRole(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as AuthedRequest).auth;
    if (!auth) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!roles.includes(auth.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  };
}

export type { AuthedRequest };
