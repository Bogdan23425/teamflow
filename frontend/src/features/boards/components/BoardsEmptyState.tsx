import React from "react";
import { motion } from "framer-motion";

interface BoardsEmptyStateProps {
  onCreateClick: () => void;
}

export const BoardsEmptyState: React.FC<BoardsEmptyStateProps> = ({
  onCreateClick,
}) => {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-lg-tf border border-border bg-surface px-4 py-8 md:px-6 md:py-10 flex flex-col items-center justify-center text-center gap-3 shadow-soft"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-xs text-text mb-1">
        ◦
      </div>
      <h2 className="text-sm md:text-base font-semibold text-text">
        Доски не найдены
      </h2>
      <p className="text-xs md:text-sm text-text-muted max-w-sm">
        Попробуй изменить фильтры или запрос поиска. Здесь будут появляться все
        рабочие пространства команды, когда ты их создашь.
      </p>
      <button
        type="button"
        onClick={onCreateClick}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-soft hover:shadow-strong active:scale-[0.97] transition-[transform,box-shadow,background-color] duration-150"
      >
        Создать первую доску
      </button>
    </motion.div>
  );
};
