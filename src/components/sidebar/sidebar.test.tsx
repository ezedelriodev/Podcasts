import { render, screen,  } from "@testing-library/react";
import { BrowserRouter,  } from "react-router-dom";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import { usePodcastListConnect } from "../../hooks/use-podcast-list.connect";
import { useLocation } from "react-router-dom";
import Sidebar from "./sidebar";

vi.mock("../../hooks/use-podcast-list.connect", () => ({
  usePodcastListConnect: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useLocation: vi.fn(),
    };
  });

describe("Sidebar Component", () => {
  const mockPodcastData = {
    feed: {
      entry: [
        {
          id: { attributes: { "im:id": "1" } },
          summary: { label: "This is a test description." },
        },
      ],
    },
  };

  beforeEach(() => {
    (usePodcastListConnect as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ data: mockPodcastData, isFetching: false });
    (useLocation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ pathname: "/podcast/1/episode/1" });

  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the podcast details correctly", () => {
    render(
      <BrowserRouter>
        <Sidebar id={1} image="test-image.jpg" title="Test Podcast" artistName="Test Artist" />
      </BrowserRouter>
    );

    const imgElement = screen.getByAltText("Test Podcast");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "test-image.jpg");

    const titleElement = screen.getByText("Test Podcast");
    expect(titleElement).toBeInTheDocument();

    const authorElement = screen.getByText("By: Test Artist");
    expect(authorElement).toBeInTheDocument();

    const descriptionElement = screen.getByText("This is a test description.");
    expect(descriptionElement).toBeInTheDocument();
  });
});
