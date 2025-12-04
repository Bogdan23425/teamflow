import React from "react";

interface PublicBackgroundProps {
  children: React.ReactNode;
}

export const PublicBackground: React.FC<PublicBackgroundProps> = ({
  children
}) => {
  return (
    <div className="min-h-screen bg-bg text-text antialiased">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-soft blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.06),_transparent_60%)]" />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};
