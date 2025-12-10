import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-transparent">
      <section className="tf-container flex min-h-[70vh] flex-col justify-center gap-6 py-16">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
          TeamFlow
          <span className="text-text-muted">доски и задачи</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl">
            Управляйте задачами команд в одном месте
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
            Создавайте доски, настраивайте колонки, назначайте ответственных и следите
            за прогрессом. Ничего лишнего — только рабочий флоу.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/register">
            <Button className="h-11 rounded-full px-5 text-[15px]">
              Создать аккаунт
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 pt-4 sm:grid-cols-2">
          {[
            "Создание и удаление досок с модалками",
            "Поиск и фильтр по названиям",
            "Быстрый переход к деталям доски",
            "Кеширование списка для скорости",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
