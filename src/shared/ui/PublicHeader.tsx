import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export const PublicHeader: React.FC = () => {
  return (
    <header className="border-b border-border bg-surface/95">
      <div className="tf-container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary-soft flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">TF</span>
          </div>
          <span className="text-sm font-semibold tracking-tight">
            TeamFlow
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost">Вход</Button>
          </Link>
          <Link to="/register">
            <Button>Регистрация</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
