import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "./session";

type GuardProps = {
  children: React.ReactElement;
};

export const RequireAuth: React.FC<GuardProps> = ({ children }) => {
  const token = getAccessToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export const RedirectIfAuthed: React.FC<GuardProps> = ({ children }) => {
  const token = getAccessToken();
  if (token) return <Navigate to="/app" replace />;
  return children;
};
