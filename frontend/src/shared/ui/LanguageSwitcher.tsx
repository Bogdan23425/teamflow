import React from "react";
import { FiGlobe } from "react-icons/fi";
import { useLanguage } from "@/shared/lib/i18n/LanguageProvider";

type Props = {
  className?: string;
  variant?: "default" | "ghost";
};

export const LanguageSwitcher: React.FC<Props> = ({
  className,
  variant = "default",
}) => {
  const { language, toggleLanguage } = useLanguage();

  const label = language === "ru" ? "RU" : "EN";

  const base =
    "inline-flex items-center gap-1 h-8 rounded-full px-2 pr-2.5 text-[11px] font-medium transition-all duration-150 active:scale-95";
  const stylesByVariant =
    variant === "default"
      ? "bg-bg border border-border text-text hover:bg-surface hover:shadow-soft"
      : "bg-transparent border-none text-text-muted hover:text-text";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`${base} ${stylesByVariant} ${className ?? ""}`}
      aria-label="Toggle language"
    >
      <FiGlobe className="h-3.5 w-3.5" />
      <span>{label}</span>
    </button>
  );
};
