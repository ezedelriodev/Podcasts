import { render, screen, logRoles } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Filter from "./filter";

describe("Filter Component", () => {
  it("should render the component with initial props", () => {

    const mockHandleFilterChange = vi.fn();
    const listLength = 10;

    const {container}=render(<Filter handleFilterChange={mockHandleFilterChange} listLength={listLength} />);
    logRoles(container)
    const counterElement = screen.getByText(listLength.toString());
    expect(counterElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText("Filter podcast...");
    expect(inputElement).toBeInTheDocument();
  });
});
