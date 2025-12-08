import { Router } from "express";
import { emailRouter } from "./email.js";
import { googleRouter } from "./google.js";

export const router = Router();

router.use("/", emailRouter);
router.use("/", googleRouter);
