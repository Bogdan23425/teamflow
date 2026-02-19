import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { CreateJobForm } from "@/features/employer/CreateJobForm";

export const CreateJobPage: React.FC = () => {
  return (
    <PrivateLayout>
      <CreateJobForm />
    </PrivateLayout>
  );
};
