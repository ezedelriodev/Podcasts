import { render, screen, cleanup } from "@testing-library/react";
import { usePodcastListConnect } from "../../hooks/use-podcast-detail.connect";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import Home from "./home";

vi.mock("../../hooks/use-podcast-detail.connect", () => ({
  usePodcastListConnect: vi.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });
  it("should render the LoadingIcon when isFetching is true", () => {

    (usePodcastListConnect as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isFetching: true });

    render(<Home />);
    
    const loadingIcon = screen.getByText(/loading.../i);
    expect(loadingIcon).toBeInTheDocument();
  });

  it("should not render the LoadingIcon when isFetching is false", () => {

    (usePodcastListConnect as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isFetching: false });

    render(<Home />);

    const text = screen.queryByText(/loading.../i);
    expect(text).not.toBeInTheDocument();
  
  });

});
