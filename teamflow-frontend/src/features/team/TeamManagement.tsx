// src/features/team/TeamManagement.tsx
import React from "react";
import { motion } from "framer-motion";

const teams = [
  {
    id: "t1",
    name: "Core Product",
    role: "Владелец",
    members: 8,
    boards: 5,
  },
  {
    id: "t2",
    name: "Маркетинг",
    role: "Участник",
    members: 4,
    boards: 3,
  },
];

const members = [
  { id: "m1", name: "Богдан", role: "Owner" },
  { id: "m2", name: "Аналитик", role: "Administrator" },
  { id: "m3", name: "Разработчик", role: "Member" },
];

const roleLabel: Record<string, string> = {
  Owner: "Владелец",
  Administrator: "Администратор",
  Member: "Участник",
};

export const TeamManagement: React.FC = () => {
  return (
    <main className="flex-1 bg-bg">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6 md:gap-7">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-1.5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Команда
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
              Команды и участники
            </h1>
            <p className="text-sm text-text-muted max-w-xl">
              Здесь будут список команд, создание новой команды, редактирование и
              управление участниками. Сейчас всё на моках.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-1 md:mt-0">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-soft hover:shadow-strong active:scale-[0.97] transition-[transform,box-shadow,background-color] duration-150">
              <span className="h-5 w-5 rounded-full bg-primary-soft flex items-center justify-center text-[13px] text-text">
                +
              </span>
              Новая команда
            </button>
          </div>
        </motion.header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-lg-tf border border-border bg-surface p-4 md:p-5 shadow-soft flex flex-col gap-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-text">Мои команды</h2>
              <button className="text-[11px] text-text-muted hover:text-text transition-colors">
                Управление ролями
              </button>
            </div>

            <div className="rounded-md-tf border border-border bg-bg overflow-hidden">
              <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1.2fr)] px-3 py-2 text-[11px] text-text-muted">
                <span>Команда</span>
                <span>Роль</span>
                <span>Участники</span>
                <span className="text-right">Действия</span>
              </div>
              <div className="divide-y divide-border/70">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1.2fr)] px-3 py-2.5 text-xs items-center bg-surface"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-text">
                        {team.name}
                      </span>
                      <span className="text-[11px] text-text-muted">
                        {team.boards} досок
                      </span>
                    </div>
                    <span className="text-text-muted">{team.role}</span>
                    <span className="text-text-muted">{team.members}</span>
                    <div className="flex justify-end gap-1.5">
                      <button className="rounded-full border border-border px-2 py-1 text-[11px] text-text-muted hover:bg-bg">
                        Открыть
                      </button>
                      <button className="rounded-full border border-border px-2 py-1 text-[11px] text-text-muted hover:bg-bg">
                        Редактировать
                      </button>
                      <button className="rounded-full border border-danger px-2 py-1 text-[11px] text-danger hover:bg-danger/10">
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="rounded-lg-tf border border-border bg-surface p-4 md:p-5 shadow-soft flex flex-col gap-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-text">
                Участники текущей команды
              </h2>
              <button className="text-[11px] text-text-muted hover:text-text transition-colors">
                Добавить участника
              </button>
            </div>

            <div className="space-y-2.5">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between gap-3 rounded-md-tf bg-bg px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary-soft flex items-center justify-center text-[11px] text-text">
                      {member.name.slice(0, 1)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-text">
                        {member.name}
                      </span>
                      <span className="text-[11px] text-text-muted">
                        {roleLabel[member.role] ?? member.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className="rounded-full border border-border px-2 py-1 text-[11px] text-text-muted hover:bg-surface">
                      Роль
                    </button>
                    <button className="rounded-full border border-danger px-2 py-1 text-[11px] text-danger hover:bg-danger/10">
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};
