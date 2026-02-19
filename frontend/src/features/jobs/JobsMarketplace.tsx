import React from "react";
import { fetchJobs, type JobListing } from "@/shared/api/jobs";

const employmentLabel: Record<JobListing["employmentType"], string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERN: "Internship"
};

const formatLabel: Record<JobListing["workFormat"], string> = {
  ONSITE: "On-site",
  REMOTE: "Remote",
  HYBRID: "Hybrid"
};

const mockJobs: JobListing[] = [
  {
    id: "mock-1",
    title: "Frontend React Developer",
    description: "Разработка личного кабинета кандидата, оптимизация UX и интеграция с API найма.",
    location: "Киев",
    employmentType: "FULL_TIME",
    workFormat: "REMOTE",
    createdAt: new Date().toISOString(),
    company: {
      id: "c-1",
      name: "TalentBridge",
      slug: "talentbridge",
      location: "Киев",
      website: "https://talentbridge.example"
    },
    _count: { applications: 18 }
  },
  {
    id: "mock-2",
    title: "Product Designer (Hiring)",
    description: "Дизайн флоу отклика, профиля работодателя и аналитики по конверсии вакансий.",
    location: "Львов",
    employmentType: "CONTRACT",
    workFormat: "HYBRID",
    createdAt: new Date().toISOString(),
    company: {
      id: "c-2",
      name: "HireFlow",
      slug: "hireflow",
      location: "Львов",
      website: "https://hireflow.example"
    },
    _count: { applications: 9 }
  },
  {
    id: "mock-3",
    title: "Node.js Backend Engineer",
    description: "Развитие API вакансий, откликов, статусов найма и роли работодателя/кандидата.",
    location: "Варшава",
    employmentType: "FULL_TIME",
    workFormat: "REMOTE",
    createdAt: new Date().toISOString(),
    company: {
      id: "c-3",
      name: "JobPulse",
      slug: "jobpulse",
      location: "Варшава",
      website: "https://jobpulse.example"
    },
    _count: { applications: 27 }
  }
];

type JobsMarketplaceProps = {
  variant?: "public" | "private";
};

export const JobsMarketplace: React.FC<JobsMarketplaceProps> = ({ variant = "public" }) => {
  const [jobs, setJobs] = React.useState<JobListing[]>([]);
  const [search, setSearch] = React.useState("");
  const [workFormat, setWorkFormat] = React.useState<"ALL" | JobListing["workFormat"]>("ALL");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJobs({
          search,
          ...(workFormat === "ALL" ? {} : { workFormat })
        });
        setJobs(data.length > 0 ? data : mockJobs);
      } catch {
        setError("Не удалось загрузить вакансии, показываем моки");
        setJobs(mockJobs);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [search, workFormat]);

  if (variant === "private") {
    return (
      <main className="flex-1">
        <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
              TeamFlow Jobs
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-text">
              Вакансии для product, design и engineering
            </h1>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-3 md:p-4 flex flex-col gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию, навыкам, описанию"
              className="h-11 rounded-xl border border-border bg-bg px-4 text-sm text-text outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            />

            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "ALL", label: "Все" },
                { id: "REMOTE", label: "Remote" },
                { id: "HYBRID", label: "Hybrid" },
                { id: "ONSITE", label: "On-site" }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setWorkFormat(item.id as typeof workFormat)}
                  className={[
                    "h-9 rounded-xl border px-3 text-xs",
                    workFormat === item.id
                      ? "border-primary/60 bg-primary/10 text-text"
                      : "border-border bg-bg text-text-muted"
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
              <div className="ml-auto text-xs text-text-muted">
                Вакансий: {jobs.length} · Откликов: {jobs.reduce((sum, item) => sum + item._count.applications, 0)}
              </div>
            </div>
          </div>

          {loading && <div className="text-sm text-text-muted">Загрузка вакансий…</div>}
          {error && <div className="text-sm text-danger">{error}</div>}

          {!loading && (
            <div className="grid gap-3">
              {jobs.length === 0 ? (
                <div className="rounded-xl border border-border bg-surface p-4 text-sm text-text-muted">
                  Пока нет опубликованных вакансий
                </div>
              ) : (
                jobs.map((job) => (
                  <article
                    key={job.id}
                    className="rounded-xl border border-border bg-surface px-4 py-3 shadow-soft"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-base font-semibold text-text">{job.title}</h2>
                        <p className="text-xs text-text-muted mt-1">
                          {job.company.name}
                          {job.location ? ` · ${job.location}` : ""}
                        </p>
                      </div>
                      <span className="text-[11px] text-text-muted">
                        {job._count.applications} откликов
                      </span>
                    </div>
                    <p className="text-sm text-text-muted mt-2 line-clamp-2">{job.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
                        {employmentLabel[job.employmentType]}
                      </span>
                      <span className="rounded-full bg-bg px-2.5 py-1 text-[11px] text-text-muted border border-border">
                        {formatLabel[job.workFormat]}
                      </span>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent">
      <section className="tf-container py-10 flex flex-col gap-5">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
            TeamFlow Jobs
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-text">
            Вакансии для product, design и engineering
          </h1>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-3 md:p-4 flex flex-col gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию, навыкам, описанию"
            className="h-11 rounded-xl border border-border bg-bg px-4 text-sm text-text outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          />

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "ALL", label: "Все" },
              { id: "REMOTE", label: "Remote" },
              { id: "HYBRID", label: "Hybrid" },
              { id: "ONSITE", label: "On-site" }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setWorkFormat(item.id as typeof workFormat)}
                className={[
                  "h-9 rounded-xl border px-3 text-xs",
                  workFormat === item.id
                    ? "border-primary/60 bg-primary/10 text-text"
                    : "border-border bg-bg text-text-muted"
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
            <div className="ml-auto text-xs text-text-muted">
              Вакансий: {jobs.length} · Откликов: {jobs.reduce((sum, item) => sum + item._count.applications, 0)}
            </div>
          </div>
        </div>

        {loading && <div className="text-sm text-text-muted">Загрузка вакансий…</div>}
        {error && <div className="text-sm text-danger">{error}</div>}

        {!loading && (
          <div className="grid gap-3">
            {jobs.length === 0 ? (
              <div className="rounded-xl border border-border bg-surface p-4 text-sm text-text-muted">
                Пока нет опубликованных вакансий
              </div>
            ) : (
              jobs.map((job) => (
                <article
                  key={job.id}
                  className="rounded-xl border border-border bg-surface px-4 py-3 shadow-soft"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-text">{job.title}</h2>
                      <p className="text-xs text-text-muted mt-1">
                        {job.company.name}
                        {job.location ? ` · ${job.location}` : ""}
                      </p>
                    </div>
                    <span className="text-[11px] text-text-muted">
                      {job._count.applications} откликов
                    </span>
                  </div>
                  <p className="text-sm text-text-muted mt-2 line-clamp-2">{job.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
                      {employmentLabel[job.employmentType]}
                    </span>
                    <span className="rounded-full bg-bg px-2.5 py-1 text-[11px] text-text-muted border border-border">
                      {formatLabel[job.workFormat]}
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
};
