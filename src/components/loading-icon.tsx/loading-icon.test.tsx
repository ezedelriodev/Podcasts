
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoadingIcon from "./loading-icon";

describe("LoadingIcon Component", () => {
  it("should render the loading icon and text", () => {
    render(<LoadingIcon />);
        
    const text = screen.getByText(/loading.../i);
    expect(text).toBeInTheDocument();
  });
});
