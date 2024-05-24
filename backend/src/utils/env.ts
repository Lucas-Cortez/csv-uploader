import { z } from "zod";
import "dotenv/config";

export enum Stage {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

const envSchema = z.object({
  NODE_ENV: z.nativeEnum(Stage).default(Stage.DEVELOPMENT),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
