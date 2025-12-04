import React from "react";
import { PrivateBackground } from "@/shared/layout/PrivateBackground";
import { Sidebar } from "@/shared/ui/Sidebar";
import { PrivateHeader } from "@/shared/ui/PrivateHeader";
import { Boards } from "@/features/boards/Boards";

export const BoardsPage: React.FC = () => {
  return (
    <PrivateBackground>
      <div className="flex min-h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 min-w-0 flex-col">
          <PrivateHeader />
          <div className="flex-1 min-w-0">
            <Boards />
          </div>
        </div>
      </div>
    </PrivateBackground>
  );
};
