import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { Sidebar } from "@/shared/ui/Sidebar";
import { PrivateHeader } from "@/shared/ui/PrivateHeader";
import { TeamManagement } from "@/features/team/TeamManagement";

export const TeamPage: React.FC = () => {
  return (
    <PrivateLayout>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 min-w-0 flex-col">
          <PrivateHeader />
          <div className="flex-1">
            <TeamManagement />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};
