import React from "react";
import { motion } from "framer-motion";
import { Board } from "../types";
import { BoardActionsMenu } from "./BoardActionsMenu";

interface BoardsGridViewProps {
  boards: Board[];
  onOpenBoard: (id: string) => void;
  onDeleteBoard: (id: string) => void;
}

export const BoardsGridView: React.FC<BoardsGridViewProps> = ({
  boards,
  onOpenBoard,
  onDeleteBoard,
}) => {
  return (
    <motion.div
      key="grid"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {boards.map((board, index) => (
          <motion.button
            key={board.id}
            type="button"
            onClick={() => onOpenBoard(board.id)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.26,
              delay: 0.04 * index,
              ease: "easeOut",
            }}
            whileHover={{
              y: -3,
              scale: 1.01,
              transition: { duration: 0.16 },
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex flex-col items-stretch rounded-lg-tf border border-border bg-surface p-4 md:p-5 text-left shadow-soft overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute inset-x-[-10%] top-0 h-16 bg-primary-soft" />
            </div>

            <div className="relative flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-text-muted bg-bg">
                {board.status}
              </span>
              <div className="flex items-center gap-1">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-bg text-[10px] text-text-muted group-hover:text-primary transition-colors duration-200">
                  →
                </span>
                <BoardActionsMenu onDelete={() => onDeleteBoard(board.id)} />
              </div>
            </div>

            <h2 className="relative text-sm md:text-base font-semibold mb-1.5 text-text group-hover:text-primary transition-colors duration-200">
              {board.name}
            </h2>
            <p className="relative text-xs text-text-muted leading-relaxed mb-3">
              {board.description}
            </p>

            <div className="relative mt-auto flex items-center justify-between text-[11px] text-text-muted">
              <span>{board.tasks} задач</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-10 overflow-hidden rounded-full bg-bg">
                  <span className="block h-full w-2/3 rounded-full bg-primary" />
                </span>
                <span>Прогресс</span>
              </span>
            </div>

            <div className="relative mt-2 text-[11px] text-text-muted/80">
              Обновлено: {board.updatedAt}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
