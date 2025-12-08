import React from "react";
import { motion } from "framer-motion";

const lanes = [
  {
    id: "inbox",
    name: "Входящие идеи",
    tasks: [
      "Новая доска для спринтов",
      "Раздел \"Команда\" с ролями",
      "Экран для ретроспективы",
    ],
  },
  {
    id: "sprint",
    name: "Спринт команды",
    tasks: [
      "Верстка страницы досок",
      "Создание CRUD для задач",
      "Настроить роли и доступы",
    ],
  },
  {
    id: "done",
    name: "Готово",
    tasks: [
      "Создано рабочее пространство",
      "Приглашены участники команды",
      "Настроены статусы задач",
    ],
  },
];

const sections = [
  {
    title: "Доски",
    text: "Kanban-доски для команд, проектов и спринтов. Каждый статус, колонка и фильтр — подстраиваются под твой процесс.",
  },
  {
    title: "Команды и роли",
    text: "Владелец, администратор, участник. Роли определяют, кто может менять структуру, а кто сфокусирован на задачах.",
  },
  {
    title: "Дашборд",
    text: "Краткий обзор: сколько задач в работе, что уже готово и где команда застряла.",
  },
];

export const BoardPreview: React.FC = () => {
  return (
    <section className="tf-container space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
      >
        <div className="space-y-2 max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Как выглядят разделы внутри TeamFlow
          </h2>
          <p className="text-sm text-muted md:text-[0.95rem]">
            Начинаешь с простой доски, а дальше добавляешь команды,
            дополнительные разделы и собственные статусы по мере роста
            проекта.
          </p>
        </div>
        <p className="text-xs text-muted">
          Всё, что показываем здесь, можно будет настроить под свою команду.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,0.9fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-bg/90 p-4 shadow-xl"
        >
          <div className="flex items-center justify-between gap-2 pb-3 text-[0.75rem] text-muted">
            <span>Доска «Работа команды»</span>
            <span>8 участников · 24 задачи</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {lanes.map((lane, laneIndex) => (
              <motion.div
                key={lane.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: laneIndex * 0.06,
                }}
                className="min-w-[210px] max-w-[250px] flex-1 rounded-2xl border border-border/70 bg-surface/95 p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-[0.8rem] font-medium">
                    {lane.name}
                  </span>
                  <span className="text-[0.7rem] text-muted">
                    {lane.tasks.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {lane.tasks.map((task, taskIndex) => (
                    <motion.div
                      key={task}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.35,
                        delay:
                          laneIndex * 0.06 +
                          taskIndex * 0.04,
                      }}
                      className="rounded-xl bg-bg px-2.5 py-1.75 text-[0.75rem] leading-snug ring-1 ring-border/80"
                    >
                      {task}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-3 rounded-3xl border border-border/70 bg-surface/95 p-4 shadow-md"
        >
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-border/60 bg-bg/80 px-3 py-3"
            >
              <div className="text-[0.8rem] font-medium">
                {section.title}
              </div>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted">
                {section.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
