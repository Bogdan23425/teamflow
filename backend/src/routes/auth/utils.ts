import { Response } from "express";
import { UserRole } from "@prisma/client";
import { env } from "../../config/env.js";
import { signAccessToken, signRefreshToken } from "../../lib/jwt.js";

type UserShape = {
  id: string;
  email: string;
  provider: string;
  name: string | null;
  role: UserRole;
};

export function sendAuthResponse(res: Response, user: UserShape) {
  const payload = {
    sub: user.id,
    email: user.email,
    provider: user.provider,
    role: user.role
  };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, cookieOptions());
  return res.status(200).json({
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      provider: user.provider,
      name: user.name,
      role: user.role
    }
  });
}

export function sendAuthRedirect(res: Response, user: UserShape) {
  const payload = {
    sub: user.id,
    email: user.email,
    provider: user.provider,
    role: user.role
  };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, cookieOptions());

  const dashboardPath = normalizeDashboardPath(env.FRONTEND_DASHBOARD_PATH);
  const redirectTarget =
    env.FRONTEND_SUCCESS_REDIRECT ??
    `${env.FRONTEND_ORIGIN.replace(/\/$/, "")}${dashboardPath}`;

  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Signing you in…</title>
      <meta http-equiv="refresh" content="0;url=${redirectTarget}" />
    </head>
    <body>
      <script>
        try {
          localStorage.setItem("accessToken", ${JSON.stringify(accessToken)});
        } catch (e) {}
        window.location.href = ${JSON.stringify(redirectTarget)};
      </script>
    </body>
  </html>`;

  return res.status(200).send(html);
}

export function cookieOptions() {
  const isProd = env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 30
  } as const;
}

export function clearCookieOptions() {
  const { maxAge, ...rest } = cookieOptions();
  return rest;
}

function normalizeDashboardPath(value: string) {
  if (!value) return "/app";
  return value.startsWith("/") ? value : `/${value}`;
}
