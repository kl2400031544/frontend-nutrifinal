export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50:  "#EDFAF3",
          100: "#C6F0DA",
          200: "#88DEB0",
          300: "#4EC98A",
          400: "#22B06A",
          500: "#0E9254",
          600: "#0A7544",
          700: "#075934",
          800: "#053D23",
          900: "#022112",
        },
        slate: {
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#080F1E",
        },
        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
        },
        rose: {
          400: "#FB7185",
          500: "#F43F5E",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07)",
        elevated: "0 4px 24px -4px rgba(14,146,84,0.15), 0 1px 4px rgba(0,0,0,0.06)",
        glow: "0 0 0 3px rgba(14,146,84,0.18)",
      },
    },
  },
  plugins: [],
}
