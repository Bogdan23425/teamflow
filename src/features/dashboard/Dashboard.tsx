import React from "react";
import { motion } from "framer-motion";

const boards = [
  {
    id: "team",
    title: "Командная доска",
    description: "Задачи всей команды, статусы и приоритеты в одном месте.",
    badge: "Основная",
    kind: "team" as const,
    tasks: 24,
    progress: 0.7,
  },
  {
    id: "me",
    title: "Мои задачи",
    description: "Все задачи, назначенные на тебя, без шума и отвлечений.",
    badge: "Фокус",
    kind: "personal" as const,
    tasks: 12,
    progress: 0.5,
  },
  {
    id: "sprint",
    title: "Спринт",
    description: "Текущий спринт, дедлайны и прогресс по ключевым задачам.",
    badge: "Спринт",
    kind: "sprint" as const,
    tasks: 18,
    progress: 0.6,
  },
  {
    id: "backlog",
    title: "Бэклог",
    description: "Идеи и задачи на потом, аккуратно организованные по темам.",
    badge: "Бэклог",
    kind: "backlog" as const,
    tasks: 56,
    progress: 0.2,
  },
];

const todayTasks = [
  {
    id: "t1",
    title: "Обновить спринт команды",
    board: "Командная доска",
    due: "Сегодня",
    dueTone: "danger" as const,
  },
  {
    id: "t2",
    title: "Проверить задачи в бэклоге",
    board: "Бэклог",
    due: "На этой неделе",
    dueTone: "muted" as const,
  },
  {
    id: "t3",
    title: "Согласовать цели следующего спринта",
    board: "Спринт",
    due: "Завтра",
    dueTone: "muted" as const,
  },
];

const teamLoad = [
  {
    id: "u1",
    initials: "Б",
    name: "Богдан",
    tasks: 12,
    load: 0.75,
    accent: "primary" as const,
  },
  {
    id: "u2",
    initials: "А",
    name: "Аналитик",
    tasks: 8,
    load: 0.5,
    accent: "neutral" as const,
  },
  {
    id: "u3",
    initials: "Д",
    name: "Дизайнер",
    tasks: 6,
    load: 0.4,
    accent: "neutral" as const,
  },
];

type BoardFilter = "all" | "focus" | "team";

export const Dashboard: React.FC = () => {
  const [boardFilter, setBoardFilter] = React.useState<BoardFilter>("all");

  const filteredBoards = React.useMemo(() => {
    if (boardFilter === "all") return boards;
    if (boardFilter === "focus") {
      return boards.filter((b) => b.kind === "personal" || b.kind === "sprint");
    }
    return boards.filter((b) => b.kind === "team");
  }, [boardFilter]);

  return (
    <main className="flex-1">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Добро пожаловать
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
              Рабочее пространство команды
            </h1>
            <p className="text-sm text-text-muted max-w-xl">
              Создавай доски, управляй задачами и следи за фокусом команды в одном месте.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3 mt-2 md:mt-0">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-soft hover:shadow-strong active:scale-[0.97] transition-[transform,box-shadow,background-color] duration-150">
              <span className="h-5 w-5 rounded-full bg-primary-soft flex items-center justify-center text-[13px] text-text">
                +
              </span>
              Новая доска
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-xs md:text-sm text-text-muted hover:text-text hover:bg-surface transition-colors duration-150">
              Быстрый старт
            </button>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-1.5 py-1 w-fit">
            <button
              type="button"
              onClick={() => setBoardFilter("all")}
              className={[
                "px-3 py-1.5 rounded-full text-[11px] md:text-xs transition-all duration-150",
                boardFilter === "all"
                  ? "bg-primary text-white shadow-soft"
                  : "text-text-muted hover:text-text hover:bg-bg",
              ].join(" ")}
            >
              Все доски
            </button>
            <button
              type="button"
              onClick={() => setBoardFilter("focus")}
              className={[
                "px-3 py-1.5 rounded-full text-[11px] md:text-xs transition-all duration-150",
                boardFilter === "focus"
                  ? "bg-primary text-white shadow-soft"
                  : "text-text-muted hover:text-text hover:bg-bg",
              ].join(" ")}
            >
              Фокус
            </button>
            <button
              type="button"
              onClick={() => setBoardFilter("team")}
              className={[
                "px-3 py-1.5 rounded-full text-[11px] md:text-xs transition-all duration-150",
                boardFilter === "team"
                  ? "bg-primary text-white shadow-soft"
                  : "text-text-muted hover:text-text hover:bg-bg",
              ].join(" ")}
            >
              Команда
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredBoards.map((board, index) => (
              <motion.button
                key={board.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.05 * index,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.18 },
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col items-stretch rounded-lg-tf border border-border bg-surface p-4 md:p-5 text-left shadow-soft overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute inset-x-[-10%] top-0 h-16 bg-primary-soft" />
                </div>

                <div className="relative flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-text-muted bg-bg">
                    {board.badge}
                  </span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-bg text-[10px] text-text-muted group-hover:text-primary transition-colors duration-200">
                    →
                  </span>
                </div>

                <h2 className="relative text-sm md:text-base font-semibold mb-1.5 text-text group-hover:text-primary transition-colors duration-200">
                  {board.title}
                </h2>
                <p className="relative text-xs text-text-muted leading-relaxed">
                  {board.description}
                </p>

                <div className="relative mt-4 flex items-center justify-between text-[11px] text-text-muted">
                  <span>{board.tasks} задач</span>
                  <span className="inline-flex items-center gap-2">
                    <span>Прогресс</span>
                    <span className="h-1 w-10 overflow-hidden rounded-full bg-bg">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${board.progress * 100}%` }}
                      />
                    </span>
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        <section className="mt-2 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-lg-tf border border-border bg-surface p-4 md:p-5 shadow-soft flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">Сегодня</h3>
              <span className="text-[11px] text-text-muted">
                {todayTasks.length} активные задачи
              </span>
            </div>
            <div className="space-y-2.5">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-md-tf bg-surface-variant px-3 py-2.5"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-text">
                      {task.title}
                    </span>
                    <span className="text-[11px] text-text-muted mt-0.5">
                      Доска: {task.board}
                    </span>
                  </div>
                  <span
                    className={[
                      "text-[11px]",
                      task.dueTone === "danger"
                        ? "text-danger"
                        : "text-text-muted",
                    ].join(" ")}
                  >
                    {task.due}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-lg-tf border border-border bg-surface p-4 md:p-5 shadow-soft flex flex-col gap-3"
          >
            <h3 className="text-sm font-semibold text-text">
              Загруженность команды
            </h3>
            <p className="text-xs text-text-muted">
              Визуальная оценка распределения задач по участникам. Позже сюда
              можно будет подключить реальные данные.
            </p>
            <div className="mt-2 space-y-3">
              {teamLoad.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={[
                        "h-7 w-7 rounded-full text-[11px] flex items-center justify-center",
                        member.accent === "primary"
                          ? "bg-primary-soft text-text"
                          : "bg-surface-variant text-text-muted",
                      ].join(" ")}
                    >
                      {member.initials}
                    </div>
                    <span className="text-xs text-text truncate">
                      {member.name}
                    </span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full bg-surface-variant overflow-hidden mx-2">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${member.load * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-text-muted whitespace-nowrap">
                    {member.tasks} задач
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};
