import { apiFetch } from "./client";

export type JobListing = {
  id: string;
  title: string;
  description: string;
  location?: string | null;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN";
  workFormat: "ONSITE" | "REMOTE" | "HYBRID";
  createdAt: string;
  company: {
    id: string;
    name: string;
    slug: string;
    location?: string | null;
    website?: string | null;
  };
  _count: {
    applications: number;
  };
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  website?: string | null;
  location?: string | null;
  about: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type EmployerJob = JobListing & {
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

export type JobApplication = {
  id: string;
  status: "APPLIED" | "REVIEWING" | "INTERVIEW" | "OFFER" | "REJECTED" | "HIRED";
  coverLetter: string;
  resumeUrl?: string | null;
  createdAt: string;
  job: {
    id: string;
    title: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    company: {
      id: string;
      name: string;
      slug: string;
    };
  };
};

type FetchJobsParams = {
  search?: string;
  location?: string;
  employmentType?: JobListing["employmentType"];
  workFormat?: JobListing["workFormat"];
};

export function fetchJobs(params: FetchJobsParams = {}) {
  const query = new URLSearchParams();
  if (params.search?.trim()) query.set("search", params.search.trim());
  if (params.location?.trim()) query.set("location", params.location.trim());
  if (params.employmentType) query.set("employmentType", params.employmentType);
  if (params.workFormat) query.set("workFormat", params.workFormat);

  const suffix = query.toString() ? `?${query.toString()}` : "";
  return apiFetch<JobListing[]>(`/jobs${suffix}`);
}

export function fetchMyApplications() {
  return apiFetch<JobApplication[]>("/jobs/applications/me");
}

export function fetchMyCompanies() {
  return apiFetch<Company[]>("/jobs/me/companies");
}

export function fetchEmployerJobs() {
  return apiFetch<EmployerJob[]>("/jobs/me/jobs");
}

export function createCompany(payload: {
  name: string;
  website?: string;
  location?: string;
  about?: string;
}) {
  return apiFetch<Company>("/jobs/companies", {
    method: "POST",
    body: payload
  });
}

export function createJob(payload: {
  title: string;
  description: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  employmentType?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN";
  workFormat?: "ONSITE" | "REMOTE" | "HYBRID";
  skills?: string[];
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  companyId: string;
}) {
  return apiFetch<EmployerJob>("/jobs", {
    method: "POST",
    body: payload
  });
}
