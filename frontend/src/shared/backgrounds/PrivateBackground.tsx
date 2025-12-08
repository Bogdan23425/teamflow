import React from "react";

interface PrivateBackgroundProps {
  children: React.ReactNode;
}

export const PrivateBackground: React.FC<PrivateBackgroundProps> = ({
  children,
}) => {
  return (
    <div className="relative min-h-screen bg-bg text-text overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
      </div>

      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
};
