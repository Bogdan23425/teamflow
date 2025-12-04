// src/pages/private/TeamPage.tsx
import React from "react";
import { PrivateBackground } from "@/shared/layout/PrivateBackground";
import { Sidebar } from "@/shared/ui/Sidebar";
import { PrivateHeader } from "@/shared/ui/PrivateHeader";
import { TeamManagement } from "@/features/team/TeamManagement";

export const TeamPage: React.FC = () => {
  return (
    <PrivateBackground>
      <div className="flex min-h-screen bg-bg">
        <Sidebar />
        <div className="flex flex-1 min-w-0 flex-col">
          <PrivateHeader />
          <div className="flex-1">
            <TeamManagement />
          </div>
        </div>
      </div>
    </PrivateBackground>
  );
};
