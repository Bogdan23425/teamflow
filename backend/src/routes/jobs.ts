import { Router } from "express";
import { ApplicationStatus, EmploymentType, JobStatus, UserRole, WorkFormat } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireRole, type AuthedRequest } from "../middleware/auth.js";

const createCompanySchema = z.object({
  name: z.string().min(2),
  website: z.string().url().optional(),
  location: z.string().min(2).optional(),
  about: z.string().max(3000).optional()
});

const createJobSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(20),
  location: z.string().optional(),
  salaryMin: z.number().int().nonnegative().optional(),
  salaryMax: z.number().int().nonnegative().optional(),
  currency: z.string().min(3).max(3).optional(),
  employmentType: z.nativeEnum(EmploymentType).optional(),
  workFormat: z.nativeEnum(WorkFormat).optional(),
  skills: z.array(z.string().min(1)).max(20).optional(),
  status: z.nativeEnum(JobStatus).optional(),
  companyId: z.string().min(1)
});

const updateJobSchema = createJobSchema.partial();

const createApplicationSchema = z.object({
  coverLetter: z.string().max(4000).optional(),
  resumeUrl: z.string().url().optional()
});

const updateApplicationSchema = z.object({
  status: z.nativeEnum(ApplicationStatus)
});

export const jobsRouter = Router();

jobsRouter.get(
  "/me/companies",
  requireAuth,
  requireRole([UserRole.EMPLOYER, UserRole.ADMIN]),
  async (req, res) => {
    const auth = (req as AuthedRequest).auth!;
    const companies = await prisma.company.findMany({
      where: auth.role === "ADMIN" ? {} : { ownerId: auth.sub },
      orderBy: { createdAt: "desc" }
    });
    return res.json(companies);
  }
);

jobsRouter.get(
  "/me/jobs",
  requireAuth,
  requireRole([UserRole.EMPLOYER, UserRole.ADMIN]),
  async (req, res) => {
    const auth = (req as AuthedRequest).auth!;
    const jobs = await prisma.job.findMany({
      where:
        auth.role === "ADMIN"
          ? {}
          : {
              company: {
                ownerId: auth.sub
              }
            },
      include: {
        company: { select: { id: true, name: true, slug: true } },
        _count: { select: { applications: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return res.json(jobs);
  }
);

jobsRouter.get("/", async (req, res) => {
  const search = String(req.query.search ?? "").trim();
  const location = String(req.query.location ?? "").trim();
  const employmentType =
    typeof req.query.employmentType === "string" &&
    Object.values(EmploymentType).includes(req.query.employmentType as EmploymentType)
      ? (req.query.employmentType as EmploymentType)
      : undefined;
  const workFormat =
    typeof req.query.workFormat === "string" &&
    Object.values(WorkFormat).includes(req.query.workFormat as WorkFormat)
      ? (req.query.workFormat as WorkFormat)
      : undefined;

  const jobs = await prisma.job.findMany({
    where: {
      status: "PUBLISHED",
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { skills: { hasSome: search.split(/\s+/).filter(Boolean) } }
            ]
          }
        : {}),
      ...(location ? { location: { contains: location, mode: "insensitive" } } : {}),
      ...(employmentType ? { employmentType } : {}),
      ...(workFormat ? { workFormat } : {})
    },
    include: {
      company: { select: { id: true, name: true, slug: true, location: true, website: true } },
      _count: { select: { applications: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return res.json(jobs);
});

jobsRouter.get("/:id", async (req, res) => {
  const job = await prisma.job.findUnique({
    where: { id: req.params.id },
    include: {
      company: true,
      _count: { select: { applications: true } }
    }
  });

  if (!job || job.status !== "PUBLISHED") {
    return res.status(404).json({ error: "Job not found" });
  }

  return res.json(job);
});

jobsRouter.post(
  "/companies",
  requireAuth,
  requireRole([UserRole.EMPLOYER, UserRole.ADMIN]),
  async (req, res) => {
    const parsed = createCompanySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation error",
        fieldErrors: parsed.error.flatten().fieldErrors
      });
    }

    const auth = (req as AuthedRequest).auth!;
    const data = parsed.data;
    const company = await prisma.company.create({
      data: {
        name: data.name.trim(),
        slug: uniqueSlug(data.name),
        website: data.website,
        location: data.location?.trim(),
        about: data.about?.trim() ?? "",
        ownerId: auth.sub
      }
    });

    return res.status(201).json(company);
  }
);

jobsRouter.post("/", requireAuth, requireRole([UserRole.EMPLOYER, UserRole.ADMIN]), async (req, res) => {
  const parsed = createJobSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation error",
      fieldErrors: parsed.error.flatten().fieldErrors
    });
  }

  const auth = (req as AuthedRequest).auth!;
  const payload = parsed.data;

  const company = await prisma.company.findUnique({ where: { id: payload.companyId } });
  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }
  if (auth.role !== "ADMIN" && company.ownerId !== auth.sub) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const job = await prisma.job.create({
    data: {
      title: payload.title.trim(),
      slug: uniqueSlug(payload.title),
      description: payload.description.trim(),
      location: payload.location?.trim(),
      salaryMin: payload.salaryMin,
      salaryMax: payload.salaryMax,
      currency: payload.currency?.toUpperCase() ?? "USD",
      employmentType: payload.employmentType ?? "FULL_TIME",
      workFormat: payload.workFormat ?? "REMOTE",
      skills: payload.skills ?? [],
      status: payload.status ?? "DRAFT",
      companyId: payload.companyId,
      createdById: auth.sub
    },
    include: { company: true }
  });

  return res.status(201).json(job);
});

jobsRouter.patch("/:id", requireAuth, requireRole([UserRole.EMPLOYER, UserRole.ADMIN]), async (req, res) => {
  const parsed = updateJobSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation error",
      fieldErrors: parsed.error.flatten().fieldErrors
    });
  }

  const auth = (req as AuthedRequest).auth!;
  const existing = await prisma.job.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ error: "Job not found" });
  }

  const company = await prisma.company.findUnique({ where: { id: existing.companyId } });
  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }
  if (auth.role !== "ADMIN" && company.ownerId !== auth.sub) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const data = parsed.data;
  const updated = await prisma.job.update({
    where: { id: existing.id },
    data: {
      title: data.title?.trim(),
      description: data.description?.trim(),
      location: data.location?.trim(),
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      currency: data.currency?.toUpperCase(),
      employmentType: data.employmentType,
      workFormat: data.workFormat,
      skills: data.skills,
      status: data.status
    }
  });

  return res.json(updated);
});

jobsRouter.delete("/:id", requireAuth, requireRole([UserRole.EMPLOYER, UserRole.ADMIN]), async (req, res) => {
  const auth = (req as AuthedRequest).auth!;
  const existing = await prisma.job.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ error: "Job not found" });
  }

  const company = await prisma.company.findUnique({ where: { id: existing.companyId } });
  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }
  if (auth.role !== "ADMIN" && company.ownerId !== auth.sub) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await prisma.job.delete({ where: { id: existing.id } });
  return res.json({ success: true, removedId: existing.id });
});

jobsRouter.post("/:id/apply", requireAuth, requireRole([UserRole.CANDIDATE, UserRole.ADMIN]), async (req, res) => {
  const parsed = createApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation error",
      fieldErrors: parsed.error.flatten().fieldErrors
    });
  }

  const auth = (req as AuthedRequest).auth!;
  const job = await prisma.job.findUnique({ where: { id: req.params.id } });
  if (!job || job.status !== "PUBLISHED") {
    return res.status(404).json({ error: "Job not found" });
  }

  try {
    const created = await prisma.jobApplication.create({
      data: {
        jobId: job.id,
        candidateId: auth.sub,
        coverLetter: parsed.data.coverLetter?.trim() ?? "",
        resumeUrl: parsed.data.resumeUrl
      }
    });
    return res.status(201).json(created);
  } catch {
    return res.status(409).json({ error: "Application already exists" });
  }
});

jobsRouter.get(
  "/:id/applications",
  requireAuth,
  requireRole([UserRole.EMPLOYER, UserRole.ADMIN]),
  async (req, res) => {
    const auth = (req as AuthedRequest).auth!;
    const job = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const company = await prisma.company.findUnique({ where: { id: job.companyId } });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    if (auth.role !== "ADMIN" && company.ownerId !== auth.sub) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { jobId: job.id },
      include: {
        candidate: {
          select: { id: true, name: true, email: true, headline: true, location: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return res.json(applications);
  }
);

jobsRouter.get("/applications/me", requireAuth, async (req, res) => {
  const auth = (req as AuthedRequest).auth!;
  const applications = await prisma.jobApplication.findMany({
    where: { candidateId: auth.sub },
    include: {
      job: {
        include: {
          company: { select: { id: true, name: true, slug: true } }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  return res.json(applications);
});

jobsRouter.patch(
  "/applications/:id/status",
  requireAuth,
  requireRole([UserRole.EMPLOYER, UserRole.ADMIN]),
  async (req, res) => {
    const parsed = updateApplicationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation error",
        fieldErrors: parsed.error.flatten().fieldErrors
      });
    }

    const auth = (req as AuthedRequest).auth!;
    const existing = await prisma.jobApplication.findUnique({
      where: { id: req.params.id },
      include: { job: true }
    });
    if (!existing) {
      return res.status(404).json({ error: "Application not found" });
    }

    const company = await prisma.company.findUnique({ where: { id: existing.job.companyId } });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    if (auth.role !== "ADMIN" && company.ownerId !== auth.sub) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await prisma.jobApplication.update({
      where: { id: existing.id },
      data: { status: parsed.data.status }
    });

    return res.json(updated);
  }
);

function uniqueSlug(value: string) {
  return `${slugify(value)}-${Math.random().toString(36).slice(2, 8)}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}
