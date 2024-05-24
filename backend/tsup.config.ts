import { defineConfig } from "tsup";

export default defineConfig((options) => {
  // @ts-ignore
  const isDev = options?.["--"]?.[0] === "dev" || false;

  return {
    ignoreWatch: ["node_modules"],
    clean: true,
    outDir: "dist",
    format: ["esm", "cjs"],
    entry: ["src/server.ts"],
    watch: isDev,
    sourcemap: isDev,
    onSuccess: isDev ? "node dist/server.js" : undefined,
    minify: !isDev,
    ...options,
  };
});
