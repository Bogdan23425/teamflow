import React, { useState } from "react";
import { cn } from "@/shared/utils/cn";
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, className, error, leftIcon, rightIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-xs font-medium text-text">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full bg-surface border border-border text-sm text-text",
              "rounded-md px-[12px] py-[8px]",
              "focus:outline-none focus:ring-2 focus:ring-primary/40",
              !!leftIcon && "pl-10",
              (!!rightIcon || isPassword) && "pr-10",
              !!rightIcon && isPassword && "pr-16",
              error && "border-danger",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              {rightIcon}
            </div>
          )}

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors",
                rightIcon ? "right-9" : "right-3"
              )}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/5 px-2.5 py-1">
            <XCircleIcon className="h-4 w-4 text-danger" />
            <p className="text-[11px] text-danger leading-snug">{error}</p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
