import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/shared/ui/Input";

interface BoardsControlsProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const BoardsControls: React.FC<BoardsControlsProps> = ({
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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-start">
        <div className="w-full sm:w-80 max-w-xl">
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Поиск по названию или описанию…"
            type="text"
            className="text-xs md:text-sm h-10 rounded-full border-border bg-white/80 shadow-soft/30 backdrop-blur placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-primary/60"
          />
        </div>
      </div>
    </motion.section>
  );
};
