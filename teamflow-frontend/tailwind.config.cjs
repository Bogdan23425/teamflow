module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)"
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          soft: "var(--color-primary-soft)"
        },
        danger: "var(--color-danger)",
        success: "var(--color-success)"
      },
      borderRadius: {
        md: "var(--radius-md)",
        lg: "var(--radius-lg)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)"
      },
      fontFamily: {
        sans: "var(--font-family-sans)"
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)"
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)"
      },
      maxWidth: {
        layout: "var(--layout-max-width)"
      }
    }
  },
  plugins: []
};
