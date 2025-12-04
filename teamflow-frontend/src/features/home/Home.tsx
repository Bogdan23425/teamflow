import React from "react";
import { HeroSection } from "./components/HeroSection";
import { HighlightsSection } from "./components/HighlightsSection";
import { BoardPreview } from "./components/BoardPreview";
import { BottomCta } from "./components/BottomCta";

export const Home: React.FC = () => {
  return (
    <main className="tf-container py-16 space-y-20">
      <HeroSection />
      <HighlightsSection />
      <BoardPreview />
      <BottomCta />
    </main>
  );
};
