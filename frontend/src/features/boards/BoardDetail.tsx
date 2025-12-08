import React from "react";
import { useParams } from "react-router-dom";
import { MOCK_BOARD_DETAILS } from "./mocks";
import { BoardDetail as BoardDetailType } from "./types";

export const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = React.useState<BoardDetailType | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!id) return;

    const timer = setTimeout(() => {
      setData(MOCK_BOARD_DETAILS[id] ?? null);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 text-sm text-text">
        Загрузка доски…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 md:p-8 text-sm text-text">
        Доска не найдена
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
          Доска
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
          {data.name}
        </h1>
        <p className="mt-2 text-sm text-text-muted max-w-xl">
          {data.description}
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {data.columns.map((col) => {
          const tasks = data.tasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="rounded-lg-tf border border-border bg-surface shadow-soft p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-medium text-text">
                  {col.title}
                </h2>
                <span className="text-[11px] text-text-muted">
                  {tasks.length} задач
                </span>
              </div>

              {!tasks.length && (
                <p className="text-xs text-text-muted">
                  Пока нет задач в этой колонке.
                </p>
              )}

              <div className="flex flex-col gap-2">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-md-tf border border-border bg-bg px-3 py-2.5 flex flex-col gap-1"
                  >
                    <span className="text-xs font-medium text-text">
                      {t.title}
                    </span>
                    {t.description && (
                      <p className="text-[11px] text-text-muted">
                        {t.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-[10px] text-text-muted/80 mt-0.5">
                      <span>{t.assignee ?? "Без исполнителя"}</span>
                      <span>{t.updatedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
