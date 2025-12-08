import React from "react";
import { useTheme } from "@/shared/lib/theme/ThemeProvider";

export const HomeBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const base = isDark
    ? "radial-gradient(circle at 20% 20%, rgba(255, 178, 107, 0.12), transparent 32%), radial-gradient(circle at 80% 14%, rgba(249, 115, 22, 0.12), transparent 30%), linear-gradient(135deg, #080a12 0%, #0d101a 50%, #0b0e17 100%)"
    : "radial-gradient(circle at 18% 18%, rgba(37, 99, 235, 0.14), transparent 32%), radial-gradient(circle at 84% 12%, rgba(60, 160, 255, 0.14), transparent 30%), linear-gradient(135deg, #f7fbff 0%, #eef4ff 50%, #f7fbff 100%)";

  const accent = isDark
    ? "rgba(255, 226, 187, 0.09)"
    : "rgba(140, 214, 255, 0.16)";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div aria-hidden className="absolute inset-0" style={{ background: base }} />

      <div className="pointer-events-none absolute inset-0">
        <div
          aria-hidden
          className="absolute left-[-12%] top-[20%] h-64 w-64 rounded-full blur-3xl"
          style={{ background: accent }}
        />
        <div
          aria-hidden
          className="absolute right-[-8%] top-[28%] h-80 w-80 rounded-full blur-[90px]"
          style={{ background: accent }}
        />
        <div
          aria-hidden
          className="absolute bottom-[-18%] left-1/2 h-72 w-[110%] -translate-x-1/2 rounded-[40%] blur-[70px]"
          style={{ background: accent, opacity: 0.8 }}
        />
      </div>
    </div>
  );
};
