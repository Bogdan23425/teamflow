import React from "react";
import { cn } from "@/shared/utils/cn";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer select-none group",
        className
      )}
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-md border border-border bg-surface-variant shadow-[0_0_0_1px_rgba(0,0,0,0.02)] transition-all duration-200 group-hover:border-primary/70 group-hover:shadow-soft">
        <input
          type="checkbox"
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
          {...props}
        />
        <span className="h-2.5 w-2.5 rounded-[4px] bg-primary scale-0 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100" />
      </span>
      {label && (
        <span className="text-xs text-text-muted group-hover:text-foreground/80 transition-colors duration-200">
          {label}
        </span>
      )}
    </label>
  );
};
