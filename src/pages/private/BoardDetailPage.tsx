import React from "react";
import { PrivateBackground } from "@/shared/layout/PrivateBackground";
import { Sidebar } from "@/shared/ui/Sidebar";
import { PrivateHeader } from "@/shared/ui/PrivateHeader";
import { BoardDetail } from "@/features/boards/BoardDetail";

export const BoardDetailPage: React.FC = () => {
  return (
    <PrivateBackground>
      <div className="flex min-h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 min-w-0 flex-col">
          <PrivateHeader />
          <div className="flex-1 min-w-0">
            <BoardDetail />
          </div>
        </div>
      </div>
    </PrivateBackground>
  );
};
