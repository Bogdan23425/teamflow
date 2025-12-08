import React from "react";
import { DayNightBackground } from "@/shared/backgrounds/DayNightBackground";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden text-text antialiased">
      <DayNightBackground />
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
};
