import React from "react";
import { motion } from "framer-motion";
import { BoardsViewMode } from "../types";
import { Input } from "@/shared/ui/Input";

interface BoardsControlsProps {
  view: BoardsViewMode;
  onViewChange: (view: BoardsViewMode) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export const BoardsControls: React.FC<BoardsControlsProps> = ({
  view,
  onViewChange,
  search,
  onSearchChange,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="flex flex-col gap-3 md:gap-4"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-text-muted">
          Список всех досок. Переключай вид или используй поиск.
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center rounded-full bg-surface border border-border p-1 text-[11px] md:text-xs">
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              className={[
                "px-3 py-1.5 rounded-full transition-all duration-150",
                view === "grid"
                  ? "bg-bg text-text shadow-soft"
                  : "text-text-muted hover:text-text",
              ].join(" ")}
            >
              Карточки
            </button>
            <button
              type="button"
              onClick={() => onViewChange("list")}
              className={[
                "px-3 py-1.5 rounded-full transition-all duration-150",
                view === "list"
                  ? "bg-bg text-text shadow-soft"
                  : "text-text-muted hover:text-text",
              ].join(" ")}
            >
              Список
            </button>
          </div>

          <div className="w-full sm:w-72">
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Поиск по названию или описанию…"
              type="text"
              className="text-xs md:text-sm h-9 rounded-full border-border bg-surface"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
