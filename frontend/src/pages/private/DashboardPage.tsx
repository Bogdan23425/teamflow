import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { Dashboard } from "@/features/dashboard/Dashboard";

export const DashboardPage: React.FC = () => {
  return (
    <PrivateLayout>
      <Dashboard />
    </PrivateLayout>
  );
};
