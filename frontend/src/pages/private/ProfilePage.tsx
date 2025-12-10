import React from "react";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { Profile } from "@/features/profile/Profile";

export const ProfilePage: React.FC = () => {
  return (
    <PrivateLayout>
      <Profile />
    </PrivateLayout>
  );
};
