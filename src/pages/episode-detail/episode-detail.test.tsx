import { render, screen, waitFor} from "@testing-library/react";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { useParams, useLocation } from "react-router-dom";
import { usePodcastDetailConnect } from "../../hooks/use-podcast-detail.connect";
import { getPodcastDetailStorage } from "../../services/local-storage/local-storage";
import EpisodeDetail from "./episode-detail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));
vi.mock("../../hooks/use-podcast-detail.connect", () => ({
  usePodcastDetailConnect: vi.fn(),
}));
vi.mock("../../services/local-storage/local-storage", () => ({
  getPodcastDetailStorage: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
    useParams: vi.fn(),
  };
});


describe("EpisodeDetail Component", () => {
  const mockGetPodcastDetail = vi.fn();
  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.resetAllMocks();
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ podcastId: "123", episodeId: "456" });
    (usePodcastDetailConnect as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      getPodcastDetail: mockGetPodcastDetail,
    });
    (getPodcastDetailStorage as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (useLocation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ pathname: "/podcast/1/episode/1" });

  });

  it("shows the loading icon while getting the episode details", () => {
    const mockApiResponse = {
      detailsQuery: {
        trackId: "123",
        artworkUrl600: "http://example.com/image.jpg",
        trackName: "Podcast Title",
        artistName: "Artist Name",
      },
      episodesQuery: [
        { trackId: "456", trackName: "Episode 1" },
        { trackId: "789", trackName: "Episode 2" },
      ],
    };
  
    mockGetPodcastDetail.mockResolvedValueOnce(mockApiResponse);
    render(
      <QueryClientProvider client={queryClient}>
        <EpisodeDetail />
      </QueryClientProvider>);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("uploads episode details from local storage if available", async () => {
    const mockPodcastDetails = {
      podcastDetails: {
        trackId: "123",
        artworkUrl600: "http://example.com/image.jpg",
        trackName: "Podcast Title",
        artistName: "Artist Name",
      },
      episodes: [
        { trackId: "456", trackName: "Episode 1" },
        { trackId: "789", trackName: "Episode 2" },
      ],
    };

    (getPodcastDetailStorage as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPodcastDetails);

    render(
      <QueryClientProvider client={queryClient}>
        <EpisodeDetail />
      </QueryClientProvider>);
    await waitFor(() => {
      expect(screen.getByText("Episode 1")).toBeInTheDocument();
    });
  });

  it("calls fetchEpisodeDetail when there is no data in local storage", async () => {
  
    const mockApiResponse = {
      detailsQuery: {
        trackId: "123",
        artworkUrl600: "http://example.com/image.jpg",
        trackName: "Podcast Title",
        artistName: "Artist Name",
      },
      episodesQuery: [
        { trackId: "456", trackName: "Episode 1" },
        { trackId: "789", trackName: "Episode 2" },
      ],
    };

    mockGetPodcastDetail.mockResolvedValue(mockApiResponse);

    render(
      <QueryClientProvider client={queryClient}>
        <EpisodeDetail />
      </QueryClientProvider>);

  
    await waitFor(() => {
      expect(mockGetPodcastDetail).toHaveBeenCalledWith("123");
    });
    expect(screen.getAllByText("Episode 1")[0]).toBeInTheDocument();
  });
});
