import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { EmployerDashboard } from "@/features/employer/EmployerDashboard";

export const EmployerDashboardPage: React.FC = () => {
  return (
    <PrivateLayout>
      <EmployerDashboard />
    </PrivateLayout>
  );
};
