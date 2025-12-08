import React from "react";
import { HeroSection } from "./components/HeroSection";
import { HighlightsSection } from "./components/HighlightsSection";
import { BoardPreview } from "./components/BoardPreview";
import { BottomCta } from "./components/BottomCta";

export const Home: React.FC = () => {
  return (
    <main className="relative flex flex-col gap-24 py-16 md:py-24">
      <HeroSection />
      <HighlightsSection />
      <BoardPreview />
      <BottomCta />
    </main>
  );
};
