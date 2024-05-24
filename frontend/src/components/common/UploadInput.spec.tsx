import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UploadInput } from "./UploadInput";
import { describe, expect, it, vi } from "vitest";

describe("UploadInput.tsx", () => {
  it("should call onFileUpload with selected file", async () => {
    const mockOnFileUpload = vi.fn();

    render(<UploadInput onFileUpload={mockOnFileUpload} />);

    const uploadButton = screen.getByTestId("upload-button");

    const input = screen.getByTestId<HTMLInputElement>("upload-input");

    const file = new File(["content"], "test.csv", { type: "text/csv" });

    fireEvent.click(uploadButton);

    await userEvent.upload(input, file);

    await waitFor(() => expect(mockOnFileUpload).toHaveBeenCalledWith(file));
  });
});
