import { randomUUID } from "crypto";
import { User } from "../../../src/domain/entities/user";
import { UserRepository } from "../../../src/domain/repositories/user.repository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    {
      userId: randomUUID(),
      city: "Araras",
      country: "Brazil",
      name: "Lucas",
      favoriteSport: "Beach Tennis",
    },
  ];

  async createMany(users: User[]): Promise<void> {
    this.users.push(...users);
  }

  async findAll(whereOptions?: { term?: string | undefined }): Promise<User[]> {
    if (whereOptions?.term) {
      const term = whereOptions.term;

      return this.users.filter((user) => {
        return (
          user.name.includes(term) ||
          user.city.includes(term) ||
          user.country.includes(term) ||
          user.favoriteSport.includes(term)
        );
      });
    }

    return this.users;
  }
}
