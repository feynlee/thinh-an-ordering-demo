/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette taken from the storefront: stucco walls, maroon sign panel,
        // bright green lettering, green awnings, wood deli counters.
        paper: "#F8F1E3",
        rice: "#EFE3CC",
        ink: "#2B2420",
        muted: "#6A5D51",
        chili: { DEFAULT: "#A31F24", dark: "#7A1519", soft: "#F6DCDA" },
        jade: { DEFAULT: "#22783A", dark: "#17522A", soft: "#DCEED8" },
        leaf: "#6CC04A",
        turmeric: { DEFAULT: "#EA9F2F", soft: "#FBEACB" },
        wood: { DEFAULT: "#8A5A34", dark: "#5C3A1F", soft: "#EBDCC6" },
        stucco: "#E6D3AE",
        charcoal: "#2F2C2A",
        line: "#E3D4BA",
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
