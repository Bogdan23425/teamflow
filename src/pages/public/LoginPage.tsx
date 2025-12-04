import React from "react";
import { PublicHeader } from "@/shared/ui/PublicHeader";
import { PublicBackground } from "@/shared/layout/PublicBackground";
import { Login } from "@/features/auth/login/Login";

export const LoginPage: React.FC = () => {
  return (
    <PublicBackground>
      <PublicHeader />
      <div className="tf-container min-h-[calc(100vh-80px)] flex items-center justify-center py-10 md:py-16">
        <Login />
      </div>
    </PublicBackground>
  );
};
