import React from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/shared/ui/Button";

const container: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
      staggerChildren: 0.06
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

export const HeroSection: React.FC = () => {
  return (
    <section className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center pt-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center rounded-full bg-primary-soft px-4 py-1 text-xs text-primary"
        >
          Канбан-доска для команд
        </motion.div>

        <motion.h1
          variants={item}
          className="text-3xl md:text-4xl font-semibold leading-tight"
        >
          Управление задачами внутри команды без шума и хаоса
        </motion.h1>

        <motion.p
          variants={item}
          className="text-sm text-text-muted max-w-md"
        >
          TeamFlow помогает фриланс-командам и небольшим стартапам вести задачи
          по колонкам, видеть прогресс в реальном времени и не терять важное в
          бесконечных чатах.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap gap-3"
        >
          <Link to="/register">
            <Button>Начать бесплатно</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost">У меня уже есть аккаунт</Button>
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-wrap gap-4 text-xs text-text-muted"
        >
          <div>Без установки, работает в браузере</div>
          <div>Подходит для маленьких команд и студий</div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="rounded-lg bg-surface border border-border shadow-soft p-6 space-y-4"
      >
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-primary-soft" />
          <div className="h-2 w-2 rounded-full bg-primary-soft" />
          <div className="h-2 w-2 rounded-full bg-primary-soft" />
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs pt-2">
          <div className="rounded-md bg-primary-soft p-3 space-y-2">
            <div className="font-semibold">Backlog</div>
            <div className="space-y-2">
              <div className="h-8 rounded bg-bg" />
              <div className="h-8 rounded bg-bg" />
            </div>
          </div>
          <div className="rounded-md bg-primary-soft/70 p-3 space-y-2">
            <div className="font-semibold">In Progress</div>
            <div className="space-y-2">
              <div className="h-8 rounded bg-bg" />
              <div className="h-8 rounded bg-bg" />
            </div>
          </div>
          <div className="rounded-md bg-primary-soft/40 p-3 space-y-2">
            <div className="font-semibold">Done</div>
            <div className="space-y-2">
              <div className="h-8 rounded bg-bg" />
              <div className="h-8 rounded bg-bg" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
