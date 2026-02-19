import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthUser } from "@/shared/auth/session";

export const AppHomePage: React.FC = () => {
  const user = getAuthUser();
  if (user?.role === "EMPLOYER") {
    return <Navigate to="/employer" replace />;
  }
  return <Navigate to="/candidate" replace />;
};
