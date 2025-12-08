import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "Шаг 1",
    title: "Пишете задачи простым языком",
    text: "Не нужно думать о формате. Просто описываешь, что нужно сделать, к какому сроку и кто отвечает.",
    bullets: [
      "Личные и командные задачи в одном месте",
      "Подзадачи и чек-листы внутри карточки",
      "Комментарии и уточнения прямо в задаче",
    ],
  },
  {
    step: "Шаг 2",
    title: "Организуете всё в доски и списки",
    text: "Задачи не висят мёртвым грузом. Они распределены по статусам, спринтам и направлениям.",
    bullets: [
      "Доски для команд, проектов и спринтов",
      "Гибкие статусы под стиль команды",
      "Фильтры по исполнителям и срокам",
    ],
  },
  {
    step: "Шаг 3",
    title: "Следите за выполнением без хаоса",
    text: "Видно, что уже сделано, что горит и что можно отложить. Без бесконечных сообщений в мессенджере.",
    bullets: [
      "Прогресс спринта в одном экране",
      "Понятный список блокеров",
      "История того, как задача дошла до done",
    ],
  },
];

export const HighlightsSection: React.FC = () => {
  return (
    <section className="tf-container space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl space-y-3"
      >
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          Что именно делает TeamFlow с задачами
        </h2>
        <p className="text-sm text-muted md:text-[0.95rem]">
          Главная идея — убрать ощущение случайной свалки задач. Каждый шаг
          логичен: написали, разложили, довели до результата.
        </p>
      </motion.div>

      <div className="space-y-5">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="grid gap-4 rounded-3xl border border-border/70 bg-surface/90 px-4 py-5 md:grid-cols-[0.9fr,1.1fr] md:items-center md:px-6 md:py-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                <span className="h-5 w-5 rounded-full border border-border/70 text-[0.65rem] flex items-center justify-center">
                  {index + 1}
                </span>
                {step.step}
              </div>
              <h3 className="text-[1rem] font-medium md:text-[1.05rem]">
                {step.title}
              </h3>
              <p className="text-[0.8rem] leading-relaxed text-muted md:text-[0.83rem]">
                {step.text}
              </p>
            </div>
            <div>
              <ul className="space-y-1.5 list-disc list-inside text-[0.8rem] text-muted md:text-[0.83rem]">
                {step.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
