import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataCard } from "./DataCard";
import { IUser } from "../../entities/user";

describe("DataCard.tsx", () => {
  it("should render", () => {
    const user: IUser = {
      userId: "1",
      name: "Lucas",
      city: "São Paulo",
      country: "Brazil",
      favoriteSport: "Football",
    };

    render(<DataCard user={user} />);

    const card = screen.getByTestId("info-card");

    expect(card).toBeInTheDocument();

    expect(card).toHaveTextContent(user.name);
    expect(card).toHaveTextContent(user.city);
    expect(card).toHaveTextContent(user.country);
    expect(card).toHaveTextContent(user.favoriteSport);
    expect(card).not.toHaveTextContent(user.userId);
  });
});
