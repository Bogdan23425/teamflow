import React from "react";
import { createJob, fetchMyCompanies, type Company } from "@/shared/api/jobs";
import { useNavigate } from "react-router-dom";

const mockCompany: Company = {
  id: "comp-mock-1",
  name: "TalentBridge",
  slug: "talentbridge",
  website: "https://talentbridge.example",
  location: "Киев",
  about: "Мок-компания для демо режима",
  ownerId: "owner-1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const CreateJobForm: React.FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [companyId, setCompanyId] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [isPublishing, setIsPublishing] = React.useState(false);

  React.useEffect(() => {
    fetchMyCompanies()
      .then((res) => {
        const list = res.length > 0 ? res : [mockCompany];
        setCompanies(list);
        if (list[0]) setCompanyId(list[0].id);
      })
      .catch(() => {
        setCompanies([mockCompany]);
        setCompanyId(mockCompany.id);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId || !title.trim() || description.trim().length < 20) return;
    setIsPublishing(true);
    try {
      await createJob({
        title: title.trim(),
        description: description.trim(),
        location: location.trim() || undefined,
        companyId,
        status: "PUBLISHED",
        workFormat: "REMOTE",
        employmentType: "FULL_TIME"
      });
      navigate("/employer");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <main className="flex-1">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6">
        <header className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Работодатель</p>
          <h1 className="text-2xl font-semibold tracking-tight text-text">Публикация вакансии</h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-surface p-4 md:p-5 space-y-3"
        >
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-bg px-3 text-sm text-text"
          >
            <option value="">Выбери компанию</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название вакансии"
            className="h-10 w-full rounded-xl border border-border bg-bg px-3 text-sm text-text"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Локация (опционально)"
            className="h-10 w-full rounded-xl border border-border bg-bg px-3 text-sm text-text"
          />

          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание вакансии (минимум 20 символов)"
            className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text"
          />

          <button
            type="submit"
            disabled={isPublishing}
            className="h-10 rounded-xl bg-primary px-4 text-sm text-white disabled:opacity-60"
          >
            {isPublishing ? "Публикуем..." : "Опубликовать"}
          </button>
        </form>
      </div>
    </main>
  );
};
