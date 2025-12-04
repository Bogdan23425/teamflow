import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";
import { PublicBackground } from "@/shared/layout/PublicBackground";
import { ThemeProvider } from "@/shared/lib/theme/ThemeProvider";
import { LanguageProvider } from "@/shared/lib/i18n/LanguageProvider";

export const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <PublicBackground>
            <AppRoutes />
          </PublicBackground>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};
