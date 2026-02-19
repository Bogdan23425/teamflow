import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { MyApplications } from "@/features/candidate/MyApplications";

export const MyApplicationsPage: React.FC = () => {
  return (
    <PrivateLayout>
      <MyApplications />
    </PrivateLayout>
  );
};
