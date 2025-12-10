import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { Settings } from "@/features/settings/Settings";

export const SettingsPage: React.FC = () => {
  return (
    <PrivateLayout>
      <Settings />
    </PrivateLayout>
  );
};
