import React from "react";
import { PublicHeader } from "@/shared/ui/PublicHeader";
import { Home } from "@/features/home/Home";
import { HomeLayout } from "@/shared/layouts/HomeLayout";

export const LandingPage: React.FC = () => {
  return (
    <HomeLayout>
      <PublicHeader />
      <Home />
    </HomeLayout>
  );
};
