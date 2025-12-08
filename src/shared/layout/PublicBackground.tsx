import React from "react";
import { DayNightBackground } from "@/shared/ui/backgrounds/DayNightBackground";

interface PublicBackgroundProps {
  children: React.ReactNode;
}

export const PublicBackground: React.FC<PublicBackgroundProps> = ({
  children,
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg text-text antialiased">
      <DayNightBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
};
