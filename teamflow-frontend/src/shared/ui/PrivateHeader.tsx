// src/shared/ui/PrivateHeader.tsx
import React from "react";
import { motion } from "framer-motion";
import { FiSettings, FiUser } from "react-icons/fi";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { LanguageSwitcher } from "@/shared/ui/LanguageSwitcher";

export const PrivateHeader: React.FC = () => {
  return (
    <header className="fixed top-4 right-0 z-30">
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="inline-flex items-center gap-2 md:gap-3 rounded-l-full bg-surface border border-border shadow-soft px-3 md:px-4 py-2"
      >
        <div className="flex items-center gap-1.5 md:gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <span className="mx-1 h-6 w-px bg-border" />

        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bg border border-border text-[13px] text-text hover:bg-surface hover:shadow-soft transition-all duration-150 active:scale-95"
          >
            <FiSettings className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-bg border border-border px-2 py-1.5 md:px-2.5 text-xs md:text-[13px] text-text hover:bg-surface hover:shadow-soft transition-all duration-150 active:scale-95"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-[13px] text-text">
              <FiUser className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline-block max-w-[120px] truncate">
              Профиль
            </span>
          </button>
        </div>
      </motion.div>
    </header>
  );
};
