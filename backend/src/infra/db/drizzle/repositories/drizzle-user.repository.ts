import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { like, or } from "drizzle-orm";

import { usersTable } from "../../../../../drizzle/schema";
import { User } from "../../../../domain/entities/user";
import { UserRepository } from "../../../../domain/repositories/user.repository";

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async createMany(users: User[]): Promise<void> {
    await this.db.insert(usersTable).values(users);
  }

  async findAll(whereOptions?: { term?: string | undefined }): Promise<User[]> {
    const query = this.db.select().from(usersTable).$dynamic();

    if (whereOptions?.term) {
      query.where(
        or(
          like(usersTable.name, `%${whereOptions.term}%`),
          like(usersTable.city, `%${whereOptions.term}%`),
          like(usersTable.country, `%${whereOptions.term}%`),
          like(usersTable.favoriteSport, `%${whereOptions.term}%`),
        ),
      );
    }

    const data = await query;

    return data.map((user) => User.restore(user));
  }
}
