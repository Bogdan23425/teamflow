import React from "react";
import { PrivateBackground } from "@/shared/layout/PrivateBackground";
import { Sidebar } from "@/shared/ui/Sidebar";
import { PrivateHeader } from "@/shared/ui/PrivateHeader";
import { Dashboard } from "@/features/dashboard/Dashboard";

export const DashboardPage: React.FC = () => {
  return (
    <PrivateBackground>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 min-w-0 flex-col">
          <PrivateHeader />
          <div className="flex-1">
            <Dashboard />
          </div>
        </div>
      </div>
    </PrivateBackground>
  );
};
