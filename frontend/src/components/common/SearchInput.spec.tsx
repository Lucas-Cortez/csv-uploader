import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchInput } from "./SearchInput";

describe("SearchInput.tsx", () => {
  it("should call onSearchChange with correct search term", async () => {
    const mockOnSearchChange = vi.fn();

    render(<SearchInput onSearchChange={mockOnSearchChange} />);

    const inputElement = screen.getByTestId("search-input");

    fireEvent.change(inputElement, { target: { value: "Test search" } });

    await waitFor(() =>
      expect(mockOnSearchChange).toHaveBeenCalledWith("Test search")
    );
  });
});
