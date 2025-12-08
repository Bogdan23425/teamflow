import React from "react";
import { useTheme } from "@/shared/lib/theme/ThemeProvider";

interface PrivateBackgroundProps {
  children: React.ReactNode;
}

export const PrivateBackground: React.FC<PrivateBackgroundProps> = ({
  children,
}) => {
  const { theme } = useTheme();
  const bgColor = "var(--color-bg)";
  const patternColor = theme === "dark" ? "#1f2433" : "#d8def6";
  const encoded = encodeURIComponent(patternColor);
  const pattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='${encoded}' /%3E%3Ccircle cx='20' cy='20' r='1' fill='${encoded}' /%3E%3C/svg%3E")`;

  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBg = html.style.background;
    const prevHtmlBgImg = html.style.backgroundImage;
    const prevBodyBg = body.style.background;
    const prevBodyBgImg = body.style.backgroundImage;

    html.style.background = bgColor;
    html.style.backgroundImage = "none";
    body.style.background = bgColor;
    body.style.backgroundImage = "none";

    return () => {
      html.style.background = prevHtmlBg;
      html.style.backgroundImage = prevHtmlBgImg;
      body.style.background = prevBodyBg;
      body.style.backgroundImage = prevBodyBgImg;
    };
  }, [bgColor]);

  return (
    <div
      className="relative min-h-screen text-text"
      style={{
        backgroundColor: bgColor,
        backgroundImage: pattern,
      }}
    >
      {children}
    </div>
  );
};
