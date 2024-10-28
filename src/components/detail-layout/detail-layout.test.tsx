import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DetailLayout from "./detail-layout";

describe("DetailLayout Component", () => {
  it("should render the sidebar and body correctly", () => {
    const mockSidebar = <div data-testid="sidebar">Sidebar Content</div>;
    const mockBody = <div data-testid="body">Body Content</div>;

    render(<DetailLayout sidebar={mockSidebar} body={mockBody} />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toHaveTextContent("Sidebar Content");
    expect(screen.getByTestId("body")).toBeInTheDocument();
    expect(screen.getByTestId("body")).toHaveTextContent("Body Content");
  });
});
