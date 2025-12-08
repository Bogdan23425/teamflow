import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/public/LandingPage";
import { LoginPage } from "@/pages/public/LoginPage";
import { RegisterPage } from "@/pages/public/RegisterPage";
import { DashboardPage } from "@/pages/private/DashboardPage";
import { BoardsPage } from "@/pages/private/BoardsPage";
import { TeamPage } from "@/pages/private/TeamPage";
import { BoardDetailPage } from "@/pages/private/BoardDetailPage";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/app" element={<DashboardPage />} />
      <Route path="/boards" element={<BoardsPage />} />
      <Route path="/boards/:id" element={<BoardDetailPage />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  );
};
