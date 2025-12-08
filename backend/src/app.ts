import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import { env } from "./config/env.js";
import { router as authRouter } from "./routes/auth/index.js";
import { passport } from "./config/passport.js";
import { boardsRouter } from "./routes/boards.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Слишком много попыток, попробуйте позже" }
  });

  app.use(
    cors({
      origin: parseAllowedOrigins(env.FRONTEND_ORIGIN),
      credentials: true
    })
  );
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      referrerPolicy: { policy: "no-referrer" }
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/auth", authLimiter, authRouter);
  app.use("/boards", boardsRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

function parseAllowedOrigins(originEnv: string | undefined) {
  if (!originEnv) return "http://localhost:5173";
  const list = originEnv.split(",").map((v) => v.trim()).filter(Boolean);
  return list.length === 1 ? list[0] : list;
}
