import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { to: "/app", label: "Обзор" },     
  { to: "/boards", label: "Доски" },
  { to: "/team", label: "Команда" },
  { to: "/settings", label: "Настройки" }
];


const ToggleIcon: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
    {collapsed ? (
      <path
        d="M10 7.5L15 12L10 16.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M14 7.5L9 12L14 16.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapsed = () => setIsCollapsed((prev) => !prev);

  const renderContent = (variant: "desktop" | "mobile") => (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border/70">
        <div className="h-8 w-8 rounded-xl bg-primary/12 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">TF</span>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold leading-none truncate">
              TeamFlow
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Workspace
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2.5 py-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-2xl px-2.5 py-2 text-sm transition-all duration-180",
                "text-text-muted hover:text-foreground hover:bg-primary/6",
                isActive &&
                  "bg-primary/12 text-foreground font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
                isCollapsed && "justify-center"
              )
            }
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-surface-variant text-[11px] text-text-muted/80">
              {item.label.slice(0, 1)}
            </span>
            {!isCollapsed && (
              <AnimatePresence initial={false}>
                <motion.span
                  key="label"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ duration: 0.16, ease: [0.33, 1, 0.68, 1] }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              </AnimatePresence>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-3 pt-2 border-t border-border/70">
        <div className="flex items-center justify-between gap-2 rounded-2xl bg-surface-variant px-3 py-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-primary/85 to-primary/55 flex items-center justify-center text-[11px] font-semibold text-primary-foreground">
              Б
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-medium leading-tight">
                  Текущая команда
                </span>
                <span className="text-[11px] text-text-muted mt-0.5">
                  Название команды
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <span className="text-[11px] text-text-muted">
              Сменить
            </span>
          )}
        </div>
      </div>

      {variant === "desktop" && (
        <button
          type="button"
          onClick={toggleCollapsed}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-surface-variant border border-border/70 text-text-muted hover:text-foreground hover:bg-surface transition-all duration-160 active:scale-95"
        >
          <ToggleIcon collapsed={isCollapsed} />
        </button>
      )}

      {variant === "mobile" && (
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-surface-variant border border-border/70 text-text-muted hover:text-foreground hover:bg-surface transition-all duration-160 active:scale-95"
        >
          <ToggleIcon collapsed={true} />
        </button>
      )}
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -260, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0.8, 0.35, 1] }}
              className="absolute inset-y-0 left-0 flex"
            >
              <div className="my-4 ml-0 mr-6 h-[calc(100vh-2rem)]">
                <div className="h-full w-[260px] rounded-3xl border border-border bg-surface shadow-soft overflow-hidden">
                  {renderContent("mobile")}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-4 left-4 z-30 inline-flex items-center gap-2 rounded-full bg-surface border border-border/80 px-3 py-2 text-xs text-text-muted shadow-soft md:hidden active:scale-95 transition-transform duration-150"
        whileTap={{ scale: 0.96 }}
      >
        <span className="h-6 w-6 rounded-full bg-primary/12 flex items-center justify-center text-[11px] text-primary">
          TF
        </span>
        <span>Меню</span>
      </motion.button>

    <motion.aside
        className="hidden md:flex flex-shrink-0"
        initial={false}
        animate={{
            width: isCollapsed ? 88 : 280,
        }}
        transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
        >
        <div className="my-4 mr-4 h-[calc(100vh-2rem)]">
            <div className="relative h-full bg-surface shadow-soft rounded-r-3xl rounded-l-none border border-border overflow-hidden">
            {renderContent("desktop")}
            </div>
        </div>
        </motion.aside>
    </>
  );
};
