import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().optional(),
  DATABASE_URL: z.string().url({ message: "DATABASE_URL must be a valid URL" }),
  JWT_ACCESS_SECRET: z.string().min(16, "JWT_ACCESS_SECRET too short"),
  JWT_REFRESH_SECRET: z.string().min(16, "JWT_REFRESH_SECRET too short"),
  FRONTEND_ORIGIN: z.string().url({ message: "FRONTEND_ORIGIN must be a valid URL" }),
  FRONTEND_SUCCESS_REDIRECT: z.string().url({ message: "FRONTEND_SUCCESS_REDIRECT must be a valid URL" }).optional(),
  FRONTEND_DASHBOARD_PATH: z.string().default("/app"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  LINKEDIN_CLIENT_ID: z.string().optional(),
  LINKEDIN_CLIENT_SECRET: z.string().optional(),
  FACEBOOK_CLIENT_ID: z.string().optional(),
  FACEBOOK_CLIENT_SECRET: z.string().optional(),
  OAUTH_CALLBACK_URL: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("Invalid environment variables", parsed.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
