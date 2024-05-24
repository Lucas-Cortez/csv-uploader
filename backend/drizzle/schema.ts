import { randomUUID } from "crypto";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  userId: text("userId")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  favoriteSport: text("favoriteSport").notNull(),
});

// export type UserSelect = typeof users.$inferSelect;
// export type UserInsert = typeof users.$inferInsert;
