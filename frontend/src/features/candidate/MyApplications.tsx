import React from "react";
import { fetchMyApplications, type JobApplication } from "@/shared/api/jobs";

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
      title: "Backend Engineer",
      status: "PUBLISHED",
      company: {
        id: "c-2",
        name: "HireFlow",
        slug: "hireflow"
      }
    }
  }
];

export const MyApplications: React.FC = () => {
  const [applications, setApplications] = React.useState<JobApplication[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const data = await fetchMyApplications().catch(() => []);
        setApplications(data.length > 0 ? data : mockApplications);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <main className="flex-1">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6">
        <header className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Кандидат</p>
          <h1 className="text-2xl font-semibold tracking-tight text-text">Мои отклики</h1>
        </header>

        {loading ? (
          <div className="text-sm text-text-muted">Загрузка…</div>
        ) : applications.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-4 text-sm text-text-muted">
            У тебя пока нет откликов
          </div>
        ) : (
          <div className="space-y-2">
            {applications.map((application) => (
              <article
                key={application.id}
                className="rounded-xl border border-border bg-surface px-4 py-3"
              >
                <h2 className="text-sm font-semibold text-text">{application.job.title}</h2>
                <p className="text-xs text-text-muted mt-0.5">{application.job.company.name}</p>
                <p className="text-xs text-primary mt-2">Статус: {application.status}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
