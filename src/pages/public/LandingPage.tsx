// src/pages/public/LandingPage.tsx
import React from "react";
import { PublicHeader } from "@/shared/ui/PublicHeader";
import { PublicBackground } from "@/shared/layout/PublicBackground";
import { Home } from "@/features/home/Home";

export const LandingPage: React.FC = () => {
  return (
    <PublicBackground>
      <PublicHeader />
      <Home />
    </PublicBackground>
  );
};
