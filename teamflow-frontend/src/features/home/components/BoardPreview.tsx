import React from "react";
import { motion } from "framer-motion";

export const BoardPreview: React.FC = () => {
  return (
    <section className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">
          Все задачи команды в одной аккуратной доске
        </h2>
        <p className="text-sm text-text-muted max-w-md">
          TeamFlow строится вокруг простых колонок и карточек. Видно, кто чем
          занят, какие задачи блокируются и что уже улетело в Done.
        </p>
        <p className="text-sm text-text-muted max-w-md">
          Вместо разрозненных сообщений — единое место, где команда планирует
          спринты, фиксирует задачи и следит за прогрессом.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className="rounded-lg bg-surface border border-border shadow-soft p-5 space-y-4"
      >
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 min-w-[88px] items-center justify-center rounded-full bg-bg px-3 text-[11px] font-medium">
              Sprint #12
            </span>
            <span>Команда дизайна</span>
          </div>
          <div className="flex -space-x-2">
            <div className="h-6 w-6 rounded-full bg-bg border border-border" />
            <div className="h-6 w-6 rounded-full bg-bg border border-border" />
            <div className="h-6 w-6 rounded-full bg-bg border border-border" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="rounded-md bg-primary-soft p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[11px] uppercase tracking-wide">
                Backlog
              </div>
              <span className="text-[10px] text-text-muted">4</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-md bg-bg p-2 space-y-1">
                <div className="h-2 w-24 rounded bg-primary/40" />
                <div className="h-2 w-16 rounded bg-primary/20" />
              </div>
              <div className="rounded-md bg-bg p-2 space-y-1">
                <div className="h-2 w-20 rounded bg-primary/35" />
                <div className="h-2 w-12 rounded bg-primary/20" />
              </div>
            </div>
          </div>

          <div className="rounded-md bg-primary-soft/70 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[11px] uppercase tracking-wide">
                In Progress
              </div>
              <span className="text-[10px] text-text-muted">3</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-md bg-bg p-2 space-y-1">
                <div className="flex justify-between items-center">
                  <div className="h-2 w-20 rounded bg-primary/50" />
                  <div className="h-2 w-8 rounded bg-primary/40" />
                </div>
                <div className="h-2 w-16 rounded bg-primary/25" />
              </div>
              <div className="rounded-md bg-bg p-2 space-y-1">
                <div className="h-2 w-18 rounded bg-primary/40" />
                <div className="h-2 w-10 rounded bg-primary/25" />
              </div>
            </div>
          </div>

          <div className="rounded-md bg-primary-soft/40 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[11px] uppercase tracking-wide">
                Done
              </div>
              <span className="text-[10px] text-text-muted">6</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-md bg-bg p-2 space-y-1">
                <div className="h-2 w-22 rounded bg-primary/30" />
                <div className="h-2 w-14 rounded bg-primary/20" />
              </div>
              <div className="rounded-md bg-bg p-2 space-y-1">
                <div className="h-2 w-18 rounded bg-primary/25" />
                <div className="h-2 w-12 rounded bg-primary/15" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
