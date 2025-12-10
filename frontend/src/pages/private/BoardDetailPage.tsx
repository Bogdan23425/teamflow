import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { BoardDetail } from "@/features/boards/BoardDetail";

export const BoardDetailPage: React.FC = () => {
  return (
    <PrivateLayout fullScreen>
      <BoardDetail />
    </PrivateLayout>
  );
};
