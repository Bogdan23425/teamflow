import React from "react";
import { FiGlobe } from "react-icons/fi";
import { useLanguage } from "@/shared/lib/i18n/LanguageProvider";

type Props = {
  className?: string;
};

export const LanguageSwitcher: React.FC<Props> = ({ className }) => {
  const { language, toggleLanguage } = useLanguage();

  const label = language === "ru" ? "RU" : "EN";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1 h-8 rounded-full bg-bg border border-border px-2 pr-2.5 text-[11px] font-medium text-text hover:bg-surface hover:shadow-soft transition-all duration-150 active:scale-95 ${className ?? ""}`}
      aria-label="Toggle language"
    >
      <FiGlobe className="h-3.5 w-3.5" />
      <span>{label}</span>
    </button>
  );
};
