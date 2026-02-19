import React from "react";
import { HomeLayout } from "@/shared/layouts/HomeLayout";
import { PublicHeader } from "@/shared/ui/PublicHeader";
import { JobsMarketplace } from "@/features/jobs/JobsMarketplace";
import { PrivateLayout } from "@/shared/layouts/PrivateLayout";
import { getAccessToken } from "@/shared/auth/session";

export const JobsPage: React.FC = () => {
  const isAuthed = Boolean(getAccessToken());

  if (isAuthed) {
    return (
      <PrivateLayout>
        <JobsMarketplace variant="private" />
      </PrivateLayout>
    );
  }

  return (
    <HomeLayout>
      <PublicHeader />
      <JobsMarketplace variant="public" />
    </HomeLayout>
  );
};
