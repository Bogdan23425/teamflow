import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiHome,
  FiSettings,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { to: "/app", label: "Обзор", icon: FiHome },
  { to: "/boards", label: "Доски", icon: FiGrid },
  { to: "/team", label: "Команда", icon: FiUsers },
  { to: "/profile", label: "Профиль", icon: FiUser },
  { to: "/settings", label: "Настройки", icon: FiSettings },
];

export const SIDEBAR_COLLAPSED_WIDTH = 88;
export const SIDEBAR_EXPANDED_WIDTH = 280;

type SidebarVariant = "desktop" | "mobile";

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  variant?: SidebarVariant;
  onCloseMobile?: () => void;
  className?: string;
};

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

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  variant = "desktop",
  onCloseMobile,
  className,
}) => {
  const isMobileVariant = variant === "mobile";

  return (
    <div className={cn("h-full", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
        <div className="relative flex h-full flex-col">
          <div className="px-3 pt-4 pb-3">
            <div className="flex items-center gap-3">
              {!collapsed && (
                <div className="flex items-center gap-2">
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/14 text-primary font-semibold shadow-[0_10px_24px_rgba(37,99,235,0.18)]">
                    TF
                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-sm font-semibold leading-tight">
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
                  onClick={onToggleCollapse}
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-variant text-text-muted shadow-soft/30 transition-all duration-160 hover:bg-surface hover:text-foreground active:scale-95"
                >
                  <ToggleIcon collapsed={collapsed} />
                </button>
              )}

              {variant === "mobile" && (
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-variant text-text-muted shadow-soft/30 transition-all duration-160 hover:bg-surface hover:text-foreground active:scale-95"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-2.5 py-3">
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
                      collapsed && "justify-center",
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
                          transition={{
                            duration: 0.22,
                            ease: [0.25, 0.8, 0.35, 1],
                          }}
                        />
                      )}
                      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-surface-variant text-[13px] text-primary transition-transform duration-150 group-hover:scale-[1.03]">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      {!collapsed && (
                        <AnimatePresence initial={false}>
                          <motion.span
                            key="label"
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{
                              duration: 0.16,
                              ease: [0.33, 1, 0.68, 1],
                            }}
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

          {isMobileVariant && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
          )}
        </div>
      </div>
    </div>
  );
};
