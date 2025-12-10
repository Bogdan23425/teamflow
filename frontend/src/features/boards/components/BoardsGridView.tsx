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
          <motion.div
            key={board.id}
            onClick={() => onOpenBoard(board.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenBoard(board.id);
              }
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.26,
              delay: 0.04 * index,
              ease: "easeOut",
            }}
            whileHover={{
              y: -3,
              scale: 1.015,
              transition: { duration: 0.16 },
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex flex-col items-stretch rounded-lg-tf border border-border bg-card p-4 md:p-5 text-left shadow-soft overflow-hidden"
            style={
              board.backgroundUrl
                ? {
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.1)), url(${board.backgroundUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {
                    background:
                      "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.08), transparent 42%), var(--color-card)",
                  }
            }
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute inset-x-[-10%] top-0 h-16 bg-primary-soft blur-[12px]" />
            </div>

            <div className="relative flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center rounded-full border border-border/70 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-text-muted bg-card/80 backdrop-blur">
                {board.status}
              </span>
              <div className="flex items-center gap-1">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-bg text-[10px] text-text-muted group-hover:text-primary transition-colors duration-200">
                  →
                </span>
                <BoardActionsMenu onDelete={() => onDeleteBoard(board.id)} />
              </div>
            </div>

            <h2 className="relative text-sm md:text-base font-semibold mb-1.5 text-text group-hover:text-primary transition-colors duration-200 drop-shadow-sm">
              {board.name}
            </h2>
            <p className="relative text-xs text-text-muted leading-relaxed mb-3 line-clamp-2">
              {board.description}
            </p>

            <div className="relative mt-auto flex items-center justify-between text-[11px] text-text-muted">
              <span>{board.tasks} задач</span>
              <div className="inline-flex items-center gap-1.5">
                <span className="h-1 w-16 overflow-hidden rounded-full bg-white/60">
                  <span className="block h-full w-2/3 rounded-full bg-primary" />
                </span>
                <span>Прогресс</span>
              </div>
            </div>

            <div className="relative mt-2 text-[11px] text-text-muted/80">
              Обновлено: {board.updatedAt}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
