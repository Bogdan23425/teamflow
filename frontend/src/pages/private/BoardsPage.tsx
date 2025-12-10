import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { Boards } from "@/features/boards/Boards";

export const BoardsPage: React.FC = () => {
  return (
    <PrivateLayout>
      <Boards />
    </PrivateLayout>
  );
};
