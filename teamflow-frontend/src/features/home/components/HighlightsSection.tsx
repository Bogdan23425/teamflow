// src/features/home/components/HighlightsSection.tsx
import React from "react";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.08 }
  }
};

const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

export const HighlightsSection: React.FC = () => {
  return (
    <section>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-6 md:grid-cols-3"
      >
        <motion.div
          variants={card}
          className="rounded-lg bg-surface border border-border p-5 space-y-2"
        >
          <h2 className="text-sm font-semibold">Прозрачный прогресс</h2>
          <p className="text-sm text-text-muted">
            Колонки и задачи обновляются в реальном времени, команда всегда
            понимает, что сейчас в работе.
          </p>
        </motion.div>

        <motion.div
          variants={card}
          className="rounded-lg bg-surface border border-border p-5 space-y-2"
        >
          <h2 className="text-sm font-semibold">Фокус без шума</h2>
          <p className="text-sm text-text-muted">
            Вместо разрозненных сообщений — централизованные задачи с
            ответственными и сроками.
          </p>
        </motion.div>

        <motion.div
          variants={card}
          className="rounded-lg bg-surface border border-border p-5 space-y-2"
        >
          <h2 className="text-sm font-semibold">Для небольших команд</h2>
          <p className="text-sm text-text-muted">
            Идеально для студий, фриланс-команд и продуктов на ранней стадии.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
