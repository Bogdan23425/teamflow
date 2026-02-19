import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { CandidateDashboard } from "@/features/candidate/CandidateDashboard";

export const CandidateDashboardPage: React.FC = () => {
  return (
    <PrivateLayout>
      <CandidateDashboard />
    </PrivateLayout>
  );
};
