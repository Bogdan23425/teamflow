import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { LanguageSwitcher } from "@/shared/ui/LanguageSwitcher";
import { cn } from "@/shared/utils/cn";
import * as authApi from "@/shared/api/auth";

type PrivateHeaderProps = {
  className?: string;
};

export const PrivateHeader: React.FC<PrivateHeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleOpenSettings = () => navigate("/settings");
  const handleOpenProfile = () => navigate("/profile");

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await authApi.logout();
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Logout failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center gap-2 md:gap-3 rounded-full bg-surface border border-border shadow-soft px-3 md:px-4 py-2",
        className
      )}
    >
      <div className="flex items-center gap-1.5 md:gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <span className="mx-1 h-6 w-px bg-border" />

      <div className="flex items-center gap-1.5 md:gap-2">
        <button
          type="button"
          onClick={handleOpenSettings}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bg border border-border text-[13px] text-text hover:bg-surface hover:shadow-soft transition-all duration-150 active:scale-95"
        >
          <FiSettings className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleOpenProfile}
          className="inline-flex items-center gap-2 rounded-full bg-bg border border-border px-2 py-1.5 md:px-2.5 text-xs md:text-[13px] text-text hover:bg-surface hover:shadow-soft transition-all duration-150 active:scale-95"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-[13px] text-text">
            <FiUser className="h-4 w-4" />
          </span>
          <span className="hidden max-w-[120px] truncate sm:inline-block">
            Профиль
          </span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-2 rounded-full bg-bg border border-border px-2 py-1.5 md:px-2.5 text-xs md:text-[13px] text-text hover:bg-surface hover:shadow-soft transition-all duration-150 active:scale-95 disabled:opacity-60"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-danger/10 text-[13px] text-danger">
            <FiLogOut className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline-block">Выйти</span>
        </button>
      </div>
    </motion.div>
  );
};
