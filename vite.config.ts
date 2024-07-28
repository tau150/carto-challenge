/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,ts,jsx,tsx}"],
      exclude: [
        "node_modules",
        "src/utils/testUtils.tsx",
        "src/**/*.constants.{js,ts,jsx,tsx}",
        "src/**/*.types.{js,ts,jsx,tsx}",
        "src/**/*.styled.{js,ts,jsx,tsx}",
        "src/**/index.{js,ts,jsx,tsx}",
      ],
    },
  },
});
