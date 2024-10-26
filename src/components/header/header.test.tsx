// Header.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "./header";


describe("Header Component", () => {
  it("should render the header with the correct link", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const linkElement = screen.getByText("Podcaster");
    expect(linkElement).toBeInTheDocument();

    expect(linkElement).toHaveAttribute("href", "/home");
  });
});
