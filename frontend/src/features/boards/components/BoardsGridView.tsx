import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Board } from "../types";

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

interface BoardsGridViewProps {
  boards: Board[];
  onOpenBoard: (id: string) => void;
  onDeleteBoard: (board: Board) => void;
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

              <CardMenu onDelete={() => onDeleteBoard(board)} />

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
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, board.progress ?? 0)
                        )}%`,
                      }}
                    />
                  </span>
                  <span>Прогресс</span>
                </div>
              </div>

              <div className="relative mt-2 text-[11px] text-text-muted/80">
                Обновлено: {formatDate(board.updatedAt)}
              </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const CardMenu: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="relative flex justify-end mb-3" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        aria-label="Меню доски"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-text-muted hover:text-text transition-all duration-150 shadow-soft/40"
      >
        <span className="text-lg leading-none">⋮</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="absolute right-0 top-11 z-10 w-44 rounded-xl border border-border bg-card shadow-soft py-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDelete();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
            >
              Удалить
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
