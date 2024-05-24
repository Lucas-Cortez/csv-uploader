import { describe, expect, it } from "vitest";
import { SearchUserUseCase } from "../../src/app/use-cases/search-user";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user.repository";

describe("SearchUserUseCase", () => {
  const UserRepository = new InMemoryUserRepository();

  const searchUserUseCase = new SearchUserUseCase(UserRepository);

  it("should be defined", () => {
    expect(searchUserUseCase).toBeInstanceOf(SearchUserUseCase);
  });

  it("should return data", async () => {
    const data = await searchUserUseCase.execute({ term: "Lucas" });

    expect(data).toHaveProperty("data");

    expect(Array.isArray(data.data)).toBe(true);

    expect(data.data.length).toBeGreaterThan(0);
  });

  it("should not return data", async () => {
    const data = await searchUserUseCase.execute({ term: "Lucass" });

    expect(data).toHaveProperty("data");

    expect(Array.isArray(data.data)).toBe(true);

    expect(data.data.length).toBe(0);
  });
});
