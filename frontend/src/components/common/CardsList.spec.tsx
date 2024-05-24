import { render, screen } from "@testing-library/react";
import { CardsList } from "./CardsList";
import { describe, expect, it } from "vitest";

describe("CardsList component", () => {
  it("should render skeleton cards when isLoading is true", () => {
    const isLoading = true;

    render(<CardsList isLoading={isLoading} users={[]} />);

    const skeletonCards = screen.getAllByTestId("info-card-skeleton");

    expect(skeletonCards.length).toBe(10);
  });

  it("should render data cards when isLoading is false", () => {
    const users = [
      {
        userId: "1",
        name: "John",
        city: "New York",
        country: "USA",
        favoriteSport: "Basketball",
      },
      {
        userId: "2",
        name: "Alice",
        city: "London",
        country: "UK",
        favoriteSport: "Tennis",
      },
    ];

    const isLoading = false;
    render(<CardsList isLoading={isLoading} users={users} />);

    const dataCards = screen.getAllByTestId("info-card");
    expect(dataCards.length).toBe(users.length);
  });

  it("should render 'No data found' when users is empty", () => {
    const isLoading = false;
    render(<CardsList isLoading={isLoading} users={[]} />);

    const text = screen.getByText("No data found");
    expect(text).toBeInTheDocument();
  });
});
