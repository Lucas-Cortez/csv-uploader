import { User } from "../entities/user";

export interface UserRepository {
  findAll(whereOptions?: { term?: string }): Promise<User[]>;
  createMany(users: User[]): Promise<void>;
}
