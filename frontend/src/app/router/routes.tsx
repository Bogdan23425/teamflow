import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/public/LandingPage";
import { LoginPage } from "@/pages/public/LoginPage";
import { RegisterPage } from "@/pages/public/RegisterPage";
import { JobsPage } from "@/pages/public/JobsPage";
import { AppHomePage } from "@/pages/private/AppHomePage";
import { ProfilePage } from "@/pages/private/ProfilePage";
import { SettingsPage } from "@/pages/private/SettingsPage";
import { CandidateDashboardPage } from "@/pages/private/CandidateDashboardPage";
import { MyApplicationsPage } from "@/pages/private/MyApplicationsPage";
import { EmployerDashboardPage } from "@/pages/private/EmployerDashboardPage";
import { CreateJobPage } from "@/pages/private/CreateJobPage";
import { RedirectIfAuthed, RequireAuth } from "@/shared/auth/guards";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route
        path="/login"
        element={
          <RedirectIfAuthed>
            <LoginPage />
          </RedirectIfAuthed>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectIfAuthed>
            <RegisterPage />
          </RedirectIfAuthed>
        }
      />

      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppHomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/candidate"
        element={
          <RequireAuth>
            <CandidateDashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/my-applications"
        element={
          <RequireAuth>
            <MyApplicationsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/employer"
        element={
          <RequireAuth>
            <EmployerDashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/employer/create-job"
        element={
          <RequireAuth>
            <CreateJobPage />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <SettingsPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
