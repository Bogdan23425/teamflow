import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { Sidebar } from "@/shared/ui/Sidebar";
import { PrivateHeader } from "@/shared/ui/PrivateHeader";
import { TeamManagement } from "@/features/team/TeamManagement";

export const TeamPage: React.FC = () => {
  return (
    <PrivateLayout>
      <div className="flex min-h-screen w-full overflow-hidden px-3 py-3 md:px-4 md:py-3 gap-3">
        <Sidebar />
        <div className="flex flex-1 min-w-0 flex-col pt-16">
          <PrivateHeader />
          <div className="flex-1">
            <TeamManagement />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};
