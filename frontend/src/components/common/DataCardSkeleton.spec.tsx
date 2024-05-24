import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataCardSkeleton } from "./DataCardSkeleton";

describe("DataCardSkeleton.tsx", () => {
  it("should render", () => {
    render(<DataCardSkeleton />);

    const card = screen.getByTestId("info-card-skeleton");

    expect(card).toBeInTheDocument();
  });
});
