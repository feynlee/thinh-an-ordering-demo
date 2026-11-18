import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works at https://<user>.github.io/<repo>/ and at any other path.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
