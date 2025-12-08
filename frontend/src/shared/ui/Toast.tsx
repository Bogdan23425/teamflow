import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/shared/utils/cn";

interface ToastProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
}

export const ToastViewport: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="pointer-events-none fixed inset-0 flex items-start justify-end px-4 py-6 md:px-6 md:py-8 z-[60]">
      {children}
    </div>
  );
};

export const Toast: React.FC<ToastProps> = ({
  open,
  title,
  description,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 24, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 24, scale: 0.97 }}
          transition={{
            duration: 0.22,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className={cn(
            "pointer-events-auto",
            "w-full max-w-sm",
            "rounded-2xl border border-border/70 bg-surface shadow-soft",
            "px-4 py-4 md:px-5 md:py-4",
            "flex items-start gap-3"
          )}
        >
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircleIcon className="h-5 w-5" />
          </div>

          <div className="flex-1 space-y-1">
            {title && (
              <div className="text-sm font-medium leading-tight">
                {title}
              </div>
            )}
            {description && (
              <p className="text-xs text-text-muted leading-snug">
                {description}
              </p>
            )}
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-text-muted hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
