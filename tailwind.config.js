/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF5EA",
        rice: "#F4EADA",
        ink: "#2A1F17",
        muted: "#6E5D4F",
        chili: { DEFAULT: "#B3332A", dark: "#8F241D", soft: "#F6DCD6" },
        jade: { DEFAULT: "#1F5A4A", dark: "#163F34", soft: "#DCEAE3" },
        turmeric: { DEFAULT: "#E0A42B", soft: "#FBEBC8" },
        line: "#E6D8C3",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(42,31,23,.06), 0 4px 16px rgba(42,31,23,.06)",
        lift: "0 8px 30px rgba(42,31,23,.14)",
      },
    },
  },
  plugins: [],
};
