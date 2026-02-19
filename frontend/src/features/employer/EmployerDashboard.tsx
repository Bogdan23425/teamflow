import React from "react";
import {
  createCompany,
  fetchEmployerJobs,
  fetchMyCompanies,
  type Company,
  type EmployerJob
} from "@/shared/api/jobs";
import { Link } from "react-router-dom";

const mockCompanies: Company[] = [
  {
    id: "comp-mock-1",
    name: "TalentBridge",
    slug: "talentbridge",
    website: "https://talentbridge.example",
    location: "Киев",
    about: "Платформа найма",
    ownerId: "owner-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockJobs: EmployerJob[] = [
  {
    id: "job-mock-1",
    title: "Frontend React Developer",
    description: "Разработка UI для кандидатов и работодателей",
    location: "Remote",
    employmentType: "FULL_TIME",
    workFormat: "REMOTE",
    status: "PUBLISHED",
    createdAt: new Date().toISOString(),
    company: { id: "comp-mock-1", name: "TalentBridge", slug: "talentbridge" },
    _count: { applications: 14 }
  },
  {
    id: "job-mock-2",
    title: "Recruitment Operations Manager",
    description: "Улучшение процессов найма и аналитики",
    location: "Киев",
    employmentType: "FULL_TIME",
    workFormat: "HYBRID",
    status: "DRAFT",
    createdAt: new Date().toISOString(),
    company: { id: "comp-mock-1", name: "TalentBridge", slug: "talentbridge" },
    _count: { applications: 0 }
  }
];

export const EmployerDashboard: React.FC = () => {
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [jobs, setJobs] = React.useState<EmployerJob[]>([]);
  const [companyName, setCompanyName] = React.useState("");
  const [creating, setCreating] = React.useState(false);

  const load = React.useCallback(async () => {
    const [companiesRes, jobsRes] = await Promise.all([
      fetchMyCompanies().catch(() => []),
      fetchEmployerJobs().catch(() => [])
    ]);
    setCompanies(companiesRes.length > 0 ? companiesRes : mockCompanies);
    setJobs(jobsRes.length > 0 ? jobsRes : mockJobs);
  }, []);

  React.useEffect(() => {
    load().catch(() => undefined);
  }, [load]);

  const handleCreateCompany = async () => {
    const name = companyName.trim();
    if (!name) return;
    setCreating(true);
    try {
      await createCompany({ name });
      setCompanyName("");
      await load();
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="flex-1">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6">
        <header className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Кабинет работодателя</p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            Компании и ваши вакансии
          </h1>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Компаний</div>
            <div className="mt-1 text-2xl font-semibold text-text">{companies.length}</div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Вакансий</div>
            <div className="mt-1 text-2xl font-semibold text-text">{jobs.length}</div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Откликов</div>
            <div className="mt-1 text-2xl font-semibold text-text">
              {jobs.reduce((sum, job) => sum + job._count.applications, 0)}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-4 md:p-5">
          <h2 className="text-sm font-semibold text-text mb-3">Создать компанию</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Название компании"
              className="h-10 flex-1 rounded-xl border border-border bg-bg px-3 text-sm text-text"
            />
            <button
              type="button"
              onClick={handleCreateCompany}
              disabled={creating}
              className="h-10 rounded-xl bg-primary px-4 text-sm text-white disabled:opacity-60"
            >
              Добавить
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-text">Мои вакансии</h2>
            <Link to="/employer/create-job" className="text-xs text-primary">
              Новая вакансия
            </Link>
          </div>
          {jobs.length === 0 ? (
            <div className="text-sm text-text-muted">Вакансий пока нет</div>
          ) : (
            <div className="space-y-2">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text"
                >
                  {job.title} · {job.company.name}
                  <span className="ml-2 text-xs text-text-muted">
                    ({job.status}, {job._count.applications} откл.)
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
