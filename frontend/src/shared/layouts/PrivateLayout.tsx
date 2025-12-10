import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { PrivateBackground } from "@/shared/backgrounds/PrivateBackground";
import {
  Sidebar,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_EXPANDED_WIDTH,
} from "@/shared/ui/Sidebar";
import { PrivateHeader } from "@/shared/ui/PrivateHeader";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

interface PrivateLayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({
  children,
  fullScreen = false,
}) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const location = useLocation();

  const [collapsed, setCollapsed] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("tf-sidebar-collapsed") === "true";
  });
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("tf-sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const showShell = !fullScreen;
  const contentMargin =
    showShell && isDesktop && !isMobile
      ? collapsed
        ? SIDEBAR_COLLAPSED_WIDTH
        : SIDEBAR_EXPANDED_WIDTH
      : 0;

  return (
    <PrivateBackground>
      {showShell && isDesktop && (
        <motion.div
          className="fixed left-0 top-0 bottom-0 z-30 p-2.5 sm:p-3"
          initial={false}
          animate={{
            width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH,
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
        >
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((v) => !v)}
            variant="desktop"
          />
        </motion.div>
      )}

      {showShell && isMobile && (
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 z-40 flex items-stretch px-4 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                aria-label="Закрыть меню"
                className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                className="relative h-full w-[260px] max-w-xs"
                initial={{ x: -280, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -280, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.25, 0.8, 0.35, 1] }}
              >
                <Sidebar
                  collapsed={false}
                  onToggleCollapse={() => setSidebarOpen(false)}
                  onCloseMobile={() => setSidebarOpen(false)}
                  variant="mobile"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <motion.div
        className="relative z-10 flex min-h-screen flex-col text-text"
        initial={false}
        animate={{ marginLeft: contentMargin }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
      >
        {showShell && (
          <div className="relative z-[5] flex items-center gap-3 pt-2 pr-2 sm:pt-3 sm:pr-3">
            {isMobile && (
              <motion.button
                type="button"
                aria-label="Открыть меню"
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text shadow-soft transition-all duration-150 hover:bg-card active:scale-95"
                whileTap={{ scale: 0.96 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </motion.button>
            )}

            <PrivateHeader className="ml-auto" />
          </div>
        )}

        <motion.main className="relative z-0 min-w-0 flex-1 overflow-visible">
          <React.Suspense
            fallback={
              <div className="h-32 rounded-2xl border border-border bg-surface shadow-soft animate-pulse" />
            }
          >
            {children}
          </React.Suspense>
        </motion.main>
      </motion.div>
    </PrivateBackground>
  );
};
