import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Button";

export const BottomCta: React.FC = () => {
  return (
    <section className="tf-container pb-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface/95 px-5 py-7 shadow-xl md:px-7 md:py-9"
      >
        <div className="pointer-events-none absolute -left-16 top-[-40%] h-40 w-40 rounded-full bg-primary/18 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-[-40%] h-48 w-48 rounded-full bg-emerald-400/16 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-[0.75rem] uppercase tracking-[0.18em] text-muted">
              Первый шаг к понятной работе команды
            </p>
            <h3 className="max-w-xl text-lg font-semibold tracking-tight md:text-xl">
              Создай первую доску и пригласи команду — дальше поток задач
              начнёт жить сам
            </h3>
            <p className="max-w-xl text-sm text-muted md:text-[0.95rem]">
              Не нужно менять весь процесс сразу. Начни с одного проекта или
              спринта, посмотри, как команда реагирует, и постепенно перенеси
              все задачи в единое пространство.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <Button size="lg">
              Начать бесплатно
            </Button>
            <p className="text-[0.75rem] text-muted">
              Без карты, без сложного онбординга. Первую доску создашь за пару
              минут.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
