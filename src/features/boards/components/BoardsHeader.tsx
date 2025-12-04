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
      className="flex flex-col gap-4 md:gap-3 md:flex-row md:items-end md:justify-between"
    >
      <div className="space-y-1.5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
          Доски
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
          Доски команды
        </h1>
        <p className="text-sm text-text-muted max-w-xl">
          Здесь будут все рабочие доски команды. Позже сюда подвяжем реальные
          данные и фильтры.
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
    </motion.header>
  );
};
