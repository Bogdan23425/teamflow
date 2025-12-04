// src/shared/ui/ThemeToggle.tsx
import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/shared/lib/theme/ThemeProvider";

type Props = {
  className?: string;
};

export const ThemeToggle: React.FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-bg border border-border text-[13px] text-text hover:bg-surface hover:shadow-soft transition-all duration-150 active:scale-95 ${className ?? ""}`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun className="h-4 w-4" />
      ) : (
        <FiMoon className="h-4 w-4" />
      )}
    </button>
  );
};
