import type { Config } from "drizzle-kit";
import { env } from "./src/utils/env";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: { url: env.DATABASE_URL },
} satisfies Config;
