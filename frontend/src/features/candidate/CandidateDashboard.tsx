import React from "react";
import { fetchJobs, fetchMyApplications, type JobApplication, type JobListing } from "@/shared/api/jobs";
import { Link } from "react-router-dom";

const mockApplications: JobApplication[] = [
  {
    id: "app-mock-1",
    status: "INTERVIEW",
    coverLetter: "",
    resumeUrl: null,
    createdAt: new Date().toISOString(),
    job: {
      id: "job-1",
      title: "Frontend React Developer",
      status: "PUBLISHED",
      company: {
        id: "c-1",
        name: "TalentBridge",
        slug: "talentbridge"
      }
    }
  },
  {
    id: "app-mock-2",
    status: "REVIEWING",
    coverLetter: "",
    resumeUrl: null,
    createdAt: new Date().toISOString(),
    job: {
      id: "job-2",
      title: "Product Designer",
      status: "PUBLISHED",
      company: {
        id: "c-2",
        name: "HireFlow",
        slug: "hireflow"
      }
    }
  }
];

const mockJobs: JobListing[] = [
  {
    id: "job-mock-1",
    title: "Node.js Backend Engineer",
    description: "Разработка API вакансий и откликов",
    location: "Remote",
    employmentType: "FULL_TIME",
    workFormat: "REMOTE",
    createdAt: new Date().toISOString(),
    company: { id: "c-3", name: "JobPulse", slug: "jobpulse", location: "Remote", website: null },
    _count: { applications: 23 }
  },
  {
    id: "job-mock-2",
    title: "QA Engineer",
    description: "Автоматизация тестирования платформы найма",
    location: "Warsaw",
    employmentType: "FULL_TIME",
    workFormat: "HYBRID",
    createdAt: new Date().toISOString(),
    company: { id: "c-4", name: "StaffNet", slug: "staffnet", location: "Warsaw", website: null },
    _count: { applications: 11 }
  }
];

export const CandidateDashboard: React.FC = () => {
  const [jobs, setJobs] = React.useState<JobListing[]>([]);
  const [applications, setApplications] = React.useState<JobApplication[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const [jobsRes, appsRes] = await Promise.all([
          fetchJobs().catch(() => []),
          fetchMyApplications().catch(() => [])
        ]);
        setJobs((jobsRes.length > 0 ? jobsRes : mockJobs).slice(0, 6));
        setApplications(appsRes.length > 0 ? appsRes : mockApplications);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <main className="flex-1">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Кабинет кандидата</p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            Вакансии и мои отклики
          </h1>
          <p className="text-sm text-text-muted">
            Отслеживай статусы откликов и находи свежие позиции.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Откликов</div>
            <div className="mt-1 text-2xl font-semibold text-text">{applications.length}</div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Интервью</div>
            <div className="mt-1 text-2xl font-semibold text-text">
              {applications.filter((a) => a.status === "INTERVIEW").length}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Офферы</div>
            <div className="mt-1 text-2xl font-semibold text-text">
              {applications.filter((a) => a.status === "OFFER").length}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-4 md:p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-sm font-semibold text-text">Мои последние отклики</h2>
            <Link to="/my-applications" className="text-xs text-primary">
              Все отклики
            </Link>
          </div>
          <div className="space-y-2">
            {applications.length === 0 ? (
              <div className="text-sm text-text-muted">Пока нет откликов</div>
            ) : (
              applications.slice(0, 5).map((application) => (
                <div
                  key={application.id}
                  className="rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text"
                >
                  {application.job.title} · {application.job.company.name}
                  <span className="ml-2 text-xs text-text-muted">({application.status})</span>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-4 md:p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-sm font-semibold text-text">Свежие вакансии</h2>
            <Link to="/jobs" className="text-xs text-primary">
              Открыть каталог
            </Link>
          </div>
          {loading ? (
            <div className="text-sm text-text-muted">Загрузка…</div>
          ) : (
            <div className="space-y-2">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text"
                >
                  {job.title} · {job.company.name}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
