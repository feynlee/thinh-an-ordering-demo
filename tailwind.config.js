/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette sampled from the restaurant's sign and storefront:
        // green "Thịnh An" lettering, red "Kitchen & Tofu", white bowl mark,
        // teal awnings with a lime leaf, and the cream stucco wall.
        paper: "#FBF6EA",
        rice: "#F2E8D0",
        ink: "#26231F",
        muted: "#655C50",
        chili: { DEFAULT: "#CF2229", dark: "#A3171D", soft: "#FBE2E0" },
        jade: { DEFAULT: "#23843D", dark: "#17602B", soft: "#E0F1DB" },
        leaf: "#8DC63F",
        teal: { DEFAULT: "#13897A", dark: "#0D6B5F", soft: "#D7EFEA" },
        turmeric: { DEFAULT: "#E9A43A", soft: "#FBEBCD" },
        wood: { DEFAULT: "#8E6A45", dark: "#5F4528", soft: "#EDE0CB" },
        stucco: "#EADCB6",
        charcoal: "#2F2C2A",
        line: "#E6D9BD",
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
