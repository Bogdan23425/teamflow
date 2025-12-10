import React from "react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "@/shared/ui/Button";

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
    <main className="flex-1">
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
            <Button variant="primary" size="md" className="rounded-full px-5">
              Новая команда
            </Button>
          </div>
        </motion.header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-2xl border border-border bg-card shadow-soft flex flex-col"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border/70">
              <div>
                <h2 className="text-sm font-semibold text-text">Мои команды</h2>
                <p className="text-xs text-text-muted">Список доступных рабочих групп</p>
              </div>
              <Button variant="secondary" size="sm" className="rounded-full">
                Управление ролями
              </Button>
            </div>

            <div className="overflow-hidden">
              <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-text-muted bg-surface">
                <span>Команда</span>
                <span>Роль</span>
                <span className="text-right">Действия</span>
              </div>
              <div className="divide-y divide-border/70">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] px-5 py-3 text-xs items-center bg-card"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-text">{team.name}</span>
                      <span className="text-[11px] text-text-muted">{team.boards} досок</span>
                    </div>
                    <span className="text-text-muted">{team.role}</span>
                    <div className="flex justify-end gap-1.5">
                      <Button variant="secondary" size="sm" className="rounded-full h-9 px-4">
                        Выбрать
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full h-9 w-9 p-0 border-danger text-danger"
                        aria-label="Удалить команду"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
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
            className="rounded-2xl border border-border bg-card p-4 md:p-5 shadow-soft flex flex-col gap-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-text">
                Участники текущей команды
              </h2>
              <Button variant="secondary" size="sm" className="rounded-full h-9 px-4">
                Добавить участника
              </Button>
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
