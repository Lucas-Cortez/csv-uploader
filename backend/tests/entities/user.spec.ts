import { describe, expect, it } from "vitest";
import { User } from "../../src/domain/entities/user";
import { randomUUID } from "crypto";

describe("User", () => {
  it("should be created from scratch", () => {
    const user = User.create({
      name: "Lucas",
      city: "New York",
      country: "USA",
      favoriteSport: "Soccer",
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty("userId");
  });

  it("should be restored", () => {
    const id = randomUUID();

    const user = User.restore({
      userId: id,
      name: "Lucas",
      city: "New York",
      country: "USA",
      favoriteSport: "Soccer",
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toBeDefined();
    expect(user.userId).toBe(id);
  });
});
