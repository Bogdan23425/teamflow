import React from "react";
import { PublicHeader } from "@/shared/ui/PublicHeader";
import { PublicBackground } from "@/shared/layout/PublicBackground";
import { Register } from "@/features/auth/register/Register";

export const RegisterPage: React.FC = () => {
  return (
    <PublicBackground>
      <PublicHeader />
      <div className="tf-container min-h-[calc(100vh-80px)] flex items-center justify-center py-10 md:py-16">
        <Register />
      </div>
    </PublicBackground>
  );
};
