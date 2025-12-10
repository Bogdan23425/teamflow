import React from "react";
import { motion } from "framer-motion";

interface BoardsHeaderProps {
  onCreateClick: () => void;
}

export const BoardsHeader: React.FC<BoardsHeaderProps> = ({
  onCreateClick,
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card/90 px-4 py-5 md:px-6 md:py-6 shadow-soft backdrop-blur"
    >
      <div className="aura" aria-hidden />
      <div className="relative flex flex-col gap-4 md:gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary shadow-soft/30">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Рабочая область
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            Доски команды
          </h1>
          <p className="text-sm text-text-muted max-w-xl">
            Управляйте проектами, переключайте виды и создавайте новые доски в один клик.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-1 md:mt-0">
          <button
            type="button"
            onClick={onCreateClick}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-soft hover:shadow-strong active:scale-[0.97] transition-[transform,box-shadow,background-color] duration-150"
          >
            <span className="h-5 w-5 rounded-full bg-primary-soft flex items-center justify-center text-[13px] text-text">
              +
            </span>
            Новая доска
          </button>
        </div>
      </div>
    </motion.header>
  );
};
