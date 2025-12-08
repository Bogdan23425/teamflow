import { Router, type Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { hashPassword, verifyPassword } from "../../lib/password.js";
import { verifyRefreshToken } from "../../lib/jwt.js";
import { env } from "../../config/env.js";
import { clearCookieOptions, cookieOptions, sendAuthResponse } from "./utils.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const emailRouter = Router();

emailRouter.post("/register", async (req, res) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }
  const { email, password, name } = parse.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "User already exists" });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      provider: "LOCAL"
    }
  });

  return sendAuthResponse(res, user);
});

emailRouter.post("/login", async (req, res) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }
  const { email, password } = parse.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return sendAuthResponse(res, user);
});

emailRouter.post("/refresh", async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.status(401).json({ error: "Missing refresh token" });
  }
  try {
    const payload = verifyRefreshToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    return sendAuthResponse(res, user);
  } catch {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
});

emailRouter.post("/logout", (_req, res) => {
  res.clearCookie("refreshToken", clearCookieOptions());
  return res.status(200).json({ success: true });
});
