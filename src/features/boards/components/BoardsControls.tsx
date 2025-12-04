import React from "react";
import { motion } from "framer-motion";
import { BOARD_FILTERS } from "../mocks";
import { BoardFilterId, BoardsViewMode } from "../types";
import { Input } from "@/shared/ui/Input";

interface BoardsControlsProps {
  activeFilter: BoardFilterId;
  onFilterChange: (id: BoardFilterId) => void;
  view: BoardsViewMode;
  onViewChange: (view: BoardsViewMode) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export const BoardsControls: React.FC<BoardsControlsProps> = ({
  activeFilter,
  onFilterChange,
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
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Фильтры по типам досок */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-1.5 py-1">
          {BOARD_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onFilterChange(filter.id)}
                className={[
                  "relative rounded-full px-3 py-1.5 text-xs md:text-[13px] transition-all duration-150",
                  isActive
                    ? "bg-primary text-white shadow-soft"
                    : "text-text-muted hover:text-text hover:bg-bg",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Поиск + переключатель вида */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="w-full sm:w-64">
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Поиск по названию или описанию…"
              type="text"
              className="text-xs md:text-sm h-9 rounded-full border-border bg-surface"
            />
          </div>

          <div className="inline-flex items-center self-start sm:self-auto rounded-full bg-surface border border-border p-1 text-[11px] md:text-xs">
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
              Сетка
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
        </div>
      </div>
    </motion.section>
  );
};
