import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";
import { describe, expect, it, vi } from "vitest";

describe("Header component", () => {
  it("should call onSearchChange and onFileUpload when search input and upload button are interacted with", async () => {
    const mockOnSearchChange = vi.fn();
    const mockOnFileUpload = vi.fn();

    render(
      <Header
        onSearchChange={mockOnSearchChange}
        onFileUpload={mockOnFileUpload}
      />
    );

    const searchInput = screen.getByTestId<HTMLInputElement>("search-input");
    const uploadButton = screen.getByTestId<HTMLButtonElement>("upload-button");

    await userEvent.type(searchInput, "test");
    await userEvent.click(uploadButton);

    const uploadInput = screen.getByTestId<HTMLInputElement>("upload-input");

    await userEvent.upload(
      uploadInput,
      new File(["content"], "test.csv", { type: "text/csv" })
    );

    await waitFor(() => {
      expect(mockOnSearchChange).toHaveBeenCalledWith("test");
    });

    await waitFor(() => {
      expect(mockOnFileUpload).toHaveBeenCalled();
    });
  });
});
