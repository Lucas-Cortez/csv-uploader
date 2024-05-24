/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      include: ["src/**"],
      exclude: ["src/config/**"],
    },
  },
});
