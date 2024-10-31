import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import PodcastDetail from "./podcast-detail";
import { useParams } from "react-router-dom";
import { usePodcastDetailConnect } from "../../hooks/use-podcast-detail.connect";
import { getPodcastDetailStorage } from "../../services/local-storage/local-storage";

interface Episode {
  trackId: string | number;
  trackName: string;
}

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

vi.mock("../../hooks/use-podcast-detail.connect", () => ({
  usePodcastDetailConnect: vi.fn(),
}));

vi.mock("../../services/local-storage/local-storage", () => ({
  getPodcastDetailStorage: vi.fn(),
}));

vi.mock("../../components/loading-icon.tsx/loading-icon", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("../../components/detail-layout/detail-layout", () => ({
  default: ({ sidebar, body }: { sidebar: React.ReactNode; body: React.ReactNode }) => (
    <div>
      <div>{sidebar}</div>
      <div>{body}</div>
    </div>
  ),
}));

vi.mock("../../components/sidebar/sidebar", () => ({
  default: ({ image, title, artistName }: { id: number; image: string; title: string; artistName: string }) => (
    <div>
      <img src={image} alt={title} />
      <p>{title}</p>
      <p>{artistName}</p>
    </div>
  ),
}));

vi.mock("../../components/episodes-list/episodes-list", () => ({
  default: ({ episodes }: { episodes: Episode[] }) => (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.trackId}>{episode.trackName}</li>
      ))}
    </ul>
  ),
}));

describe("PodcastDetail Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display the LoadingIcon while loading the podcast details", () => {
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ podcastId: "123" });
    (getPodcastDetailStorage as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (usePodcastDetailConnect as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      getPodcastDetail: vi.fn().mockResolvedValue({
        detailsQuery: null,
        episodesQuery: [],
      }),
    });


    render(<PodcastDetail />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display the Sidebar and EpisodesList when the details have been loaded.", async () => {
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ podcastId: "123" });
    (getPodcastDetailStorage as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (usePodcastDetailConnect as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      getPodcastDetail: vi.fn().mockResolvedValue({
        detailsQuery: {
          trackId: 123,
          artworkUrl600: "https://example.com/artwork.jpg",
          trackName: "Podcast Title",
          artistName: "Artist Name",
        },
        episodesQuery: [
          { trackId: 1, trackName: "Episode 1" },
          { trackId: 2, trackName: "Episode 2" },
        ],
      }),
    });

    render(<PodcastDetail />);

    await waitFor(() => {
      expect(screen.getByText("Podcast Title")).toBeInTheDocument();
      expect(screen.getByText("Artist Name")).toBeInTheDocument();
      expect(screen.getByText("Episode 1")).toBeInTheDocument();
      expect(screen.getByText("Episode 2")).toBeInTheDocument();
    });
  });

  it("should load the local storage details if available", async () => {
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ podcastId: "123" });
    (getPodcastDetailStorage as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      podcastDetails: {
        trackId: 123,
        artworkUrl600: "https://example.com/artwork.jpg",
        trackName: "Stored Podcast Title",
        artistName: "Stored Artist Name",
      },
      episodes: [
        { trackId: 1, trackName: "Stored Episode 1" },
        { trackId: 2, trackName: "Stored Episode 2" },
      ],
    });

    render(<PodcastDetail />);

    await waitFor(() => {
      expect(screen.getByText("Stored Podcast Title")).toBeInTheDocument();
      expect(screen.getByText("Stored Artist Name")).toBeInTheDocument();
      expect(screen.getByText("Stored Episode 1")).toBeInTheDocument();
      expect(screen.getByText("Stored Episode 2")).toBeInTheDocument();
    });
  });
});
