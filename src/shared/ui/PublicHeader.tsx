// src/shared/ui/PublicHeader.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { LanguageSwitcher } from "@/shared/ui/LanguageSwitcher";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export const PublicHeader: React.FC = () => {
  return (
    <header className="bg-bg/80 backdrop-blur-sm">
      <div className="tf-container h-20 flex items-center">
        <div
          className="
            w-full flex items-center justify-between
            px-5 py-2.5
            bg-surface border border-border shadow-soft
          "
          style={{
            borderRadius: "24px",
          }}
        >
          {/* ЛОГО */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft">
              <span className="text-xs font-semibold text-primary">TF</span>
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight text-text">
                TeamFlow
              </span>
              <span className="mt-0.5 text-[11px] text-text-muted tracking-wide">
                Boards & Collaboration
              </span>
            </div>
          </Link>

          {/* КОНТРОЛЫ */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            <div className="h-5 w-px bg-border" />

            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-full px-3 text-[12px]"
              >
                Вход
              </Button>
            </Link>

            <Link to="/register">
              <Button
                size="sm"
                className="h-8 rounded-full px-3 text-[12px]"
              >
                Регистрация
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
