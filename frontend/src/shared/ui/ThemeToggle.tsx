import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/shared/lib/theme/ThemeProvider";

type Props = {
  className?: string;
  variant?: "default" | "ghost";
};

export const ThemeToggle: React.FC<Props> = ({
  className,
  variant = "default",
}) => {
  const { theme, toggleTheme } = useTheme();

  const base =
    "inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition-all duration-150 active:scale-95";
  const stylesByVariant =
    variant === "default"
      ? "bg-bg border border-border text-text hover:bg-surface hover:shadow-soft"
      : "bg-transparent border-none text-text-muted hover:text-text";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${base} ${stylesByVariant} ${className ?? ""}`}
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
