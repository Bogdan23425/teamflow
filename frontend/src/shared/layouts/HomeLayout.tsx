import React from "react";
import { HomeBackground } from "@/shared/backgrounds/HomeBackground";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden text-text antialiased">
      <HomeBackground />
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
};
