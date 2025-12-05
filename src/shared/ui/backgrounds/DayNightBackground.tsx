import React, { useEffect, useRef } from "react";

export const DayNightBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    const getIsDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark";

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      t += 0.003;

      const isDark = getIsDark();

      const gradient = ctx.createLinearGradient(0, 0, w, h);

      // 🌞 Светлая тема — оставляем твою!
      const dayColors = [
        "#9dd6ff",
        "#75b8ff",
        "#bde6ff",
        "#eaf6ff"
      ];

      // 🌙 Тёмная тема — новая Calm Night палитра
      const nightColors = [
        "#050608",
        "#0a0b0f",
        "#11131a",
        "#1a1d26"
      ];

      const cols = isDark ? nightColors : dayColors;

      gradient.addColorStop(0, cols[0]);
      gradient.addColorStop(0.33, cols[1]);
      gradient.addColorStop(0.66, cols[2]);
      gradient.addColorStop(1, cols[3]);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      //
      // 🔥 Энергетический слой
      //
      ctx.globalAlpha = isDark ? 0.14 : 0.12;

      const energyColor = isDark
        ? "rgba(120,150,180,0.25)"   // спокойная энергия ночью
        : "#ffffff";                // оставили твоё дневное облако

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const x = (Math.sin(t + i * 2) + 1) * (w * 0.5);
        const y = (Math.cos(t * 1.2 + i) + 1) * (h * 0.5);

        ctx.arc(
          x,
          y,
          isDark ? 420 : 350,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = energyColor;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      //
      // ✨ Спокойное ночное свечение (новое)
      //
      if (isDark) {
        ctx.globalAlpha = 0.06;

        const calmGlow = "rgba(80,105,140,0.15)"; // мягкое холодное свечение

        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(
            (Math.sin(t * 1.3 + i) + 1) * (w / 2),
            (Math.cos(t * 1.1 + i) + 1) * (h / 2),
            230,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = calmGlow;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }

      requestAnimationFrame(render);
    };

    render();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
    />
  );
};
