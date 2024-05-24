import { describe, expect, it, vi } from "vitest";
import { useUserContext } from "./context";
import { render, screen, waitFor } from "@testing-library/react";
import { UserContextProvider } from "./provider";

vi.mock("@/services/searchUser", () => ({
  useSearchUser: vi.fn(() => ({ data: [], isLoading: false })),
}));

vi.mock("@/services/uploadFile", () => ({
  useUploadFile: vi.fn(() => ({ mutate: vi.fn() })),
}));

describe("UserContextProvider.tsx", () => {
  it("should render children and pass context values", () => {
    const MockComponent = () => {
      const userContext = useUserContext();

      return (
        <>
          <div data-testid="users">{userContext.users.length}</div>
          <div data-testid="term">{userContext.term}</div>
          <div data-testid="isLoading">{userContext.isLoading.toString()}</div>
        </>
      );
    };

    render(
      <UserContextProvider>
        <MockComponent />
      </UserContextProvider>
    );

    const user = screen.getByTestId("users");
    const term = screen.getByTestId("term");
    const isLoading = screen.getByTestId("isLoading");

    expect(user).toBeInTheDocument();
    expect(term).toBeInTheDocument();
    expect(isLoading).toBeInTheDocument();

    expect(user.textContent).toBe("0");
    expect(term.textContent).toBe("");
    expect(isLoading.textContent).toBe("false");
  });

  it("should update term correctly", async () => {
    const MockComponent = () => {
      const userContext = useUserContext();
      return (
        <>
          <div data-testid="term">{userContext.term}</div>
          <button onClick={() => userContext.searchUser("test")}>
            Update Term
          </button>
        </>
      );
    };

    render(
      <UserContextProvider>
        <MockComponent />
      </UserContextProvider>
    );

    expect(screen.getByTestId("term").textContent).toBe("");

    const updateButton = screen.getByText("Update Term");

    updateButton.click();

    await waitFor(() => {
      expect(screen.getByTestId("term").textContent).toBe("test");
    });
  });
});
