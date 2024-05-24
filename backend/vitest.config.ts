import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**"],
      exclude: ["src/server.ts", "src/infra/db/drizzle/**", "src/infra/http/**", "src/app/routes/**"],
    },
  },
});
