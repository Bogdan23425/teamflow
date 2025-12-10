import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiGrid, FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { to: "/app", label: "Обзор", icon: FiHome },
  { to: "/boards", label: "Доски", icon: FiGrid },
  { to: "/team", label: "Команда", icon: FiUsers },
  { to: "/settings", label: "Настройки", icon: FiSettings }
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

const COLLAPSED_WIDTH = 88;
const EXPANDED_WIDTH = 280;

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("tf-sidebar-collapsed");
    return stored === "true";
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapsed = () => setIsCollapsed((prev) => !prev);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tf-sidebar-collapsed", String(isCollapsed));
    }
  }, [isCollapsed]);

  const renderContent = (variant: "desktop" | "mobile") => (
    <div className="relative flex h-full flex-col">
      <div className="px-3 pt-4 pb-3">
        <div className="flex items-center gap-3">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9 rounded-2xl bg-primary/14 text-primary flex items-center justify-center font-semibold shadow-[0_10px_24px_rgba(37,99,235,0.18)]">
                TF
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold leading-tight truncate">
                  TeamFlow
                </span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  Workspace
                </span>
              </div>
            </div>
          )}
          {variant === "desktop" && (
            <button
              type="button"
              onClick={toggleCollapsed}
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl bg-surface-variant border border-border text-text-muted hover:text-foreground hover:bg-surface transition-all duration-160 active:scale-95 shadow-soft/30"
            >
              <ToggleIcon collapsed={isCollapsed} />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 px-2.5 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-2 rounded-2xl px-2.5 py-2 text-sm transition-all duration-200",
                  "text-text-muted hover:text-foreground",
                  isCollapsed && "justify-center",
                  isActive && "text-text font-medium"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-2xl bg-primary/10 shadow-[0_10px_22px_rgba(37,99,235,0.12),0_0_0_1px_rgba(37,99,235,0.16)]"
                      transition={{ duration: 0.22, ease: [0.25, 0.8, 0.35, 1] }}
                    />
                  )}
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-surface-variant text-[13px] text-primary group-hover:scale-[1.03] transition-transform duration-150">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  {!isCollapsed && (
                    <AnimatePresence initial={false}>
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.16, ease: [0.33, 1, 0.68, 1] }}
                        className="relative truncate"
                      >
                        {item.label}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

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
            width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        }}
        transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
        >
        <div
          className="h-[calc(100vh-2rem)]"
          style={{ width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
        >
          <div className="relative h-full w-full bg-surface shadow-soft rounded-3xl border border-border overflow-hidden">
            {renderContent("desktop")}
          </div>
        </div>
        </motion.aside>
    </>
  );
};
