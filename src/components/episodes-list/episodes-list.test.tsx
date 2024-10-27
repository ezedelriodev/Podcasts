import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";
import EpisodesList from "./episodes-list";
import { Episode } from "../../types/detailTypes";

vi.mock("../../helpers/helpers", () => ({
  convertMillisecondsToTime: vi.fn((ms: number) => `${Math.floor(ms / 60000)} min`),
  formatDate: vi.fn((dateString: string) => new Date(dateString).toLocaleDateString("en-US")),
}));

describe("EpisodesList Component", () => {
    const mockEpisodes: Episode[] = [
        {
          trackId: 1,
          trackName: "Episode 1: The Beginning",
          description: "In this episode, we discuss the origins of the podcast and what to expect in the future.",
          releaseDate: "2024-10-01T10:00:00Z",
          trackTimeMillis: 3600000, // 1 hour in milliseconds
          artworkUrl60: "https://example.com/artwork60_1.jpg",
          artworkUrl600: "https://example.com/artwork600_1.jpg",
          contentAdvisoryRating: "Clean",
          episodeUrl: "https://example.com/episode1.mp3",
          genres: ["Technology", "Education"],
          kind: "podcast-episode",
          wrapperType: "track"
        },
        {
          trackId: 2,
          trackName: "Episode 2: Deep Dive",
          description: "A deeper look into the main topics covered in the first episode.",
          releaseDate: "2024-10-08T10:00:00Z",
          trackTimeMillis: 900000, // 1 hour and 15 minutes in milliseconds
          artworkUrl60: "https://example.com/artwork60_2.jpg",
          artworkUrl600: "https://example.com/artwork600_2.jpg",
          contentAdvisoryRating: "Explicit",
          episodeUrl: "https://example.com/episode2.mp3",
          genres: ["Technology", "Science"],
          kind: "podcast-episode",
          wrapperType: "track"
        },
        {
            trackId: 3,
            trackName: "Episode 3: Deep Dive",
            description: "A deeper look into the main topics covered in the first episode.",
            releaseDate: "2024-10-09T10:00:00Z",
            trackTimeMillis: 4500000, // 1 hour and 15 minutes in milliseconds
            artworkUrl60: "https://example.com/artwork60_2.jpg",
            artworkUrl600: "https://example.com/artwork600_2.jpg",
            contentAdvisoryRating: "Explicit",
            episodeUrl: "https://example.com/episode2.mp3",
            genres: ["Technology", "Science"],
            kind: "podcast-episode",
            wrapperType: "track"
          }
      ];
      

  const podcastId = "123";

  it("renders the correct number of episodes, excluding the first one", () => {
    render(
      <BrowserRouter>
        <EpisodesList episodes={mockEpisodes} podcastId={podcastId} />
      </BrowserRouter>
    );

    // Verificar que el contador de episodios muestre la cantidad correcta (excluyendo el primero)
    const counterElement = screen.getByText("Episodes: 2");
    expect(counterElement).toBeInTheDocument();
  });

  it("renders the episode details correctly", () => {
    render(
      <BrowserRouter>
        <EpisodesList episodes={mockEpisodes} podcastId={podcastId} />
      </BrowserRouter>
    );

    const episodeLink1 = screen.getAllByText("Episode 2: Deep Dive")[0];
    expect(episodeLink1).toBeInTheDocument();
    expect(episodeLink1).toHaveAttribute("href", `/podcast/123/episode/2`);

    const episodeLink2 = screen.getAllByText("Episode 3: Deep Dive")[0];
    expect(episodeLink2).toBeInTheDocument();
    expect(episodeLink2).toHaveAttribute("href", `/podcast/123/episode/3`);

    const date1 = screen.getAllByText("10/8/2024")[0];
    const date2 = screen.getAllByText("10/9/2024")[0];
    expect(date1).toBeInTheDocument();
    expect(date2).toBeInTheDocument();

    const duration2 = screen.getAllByText("75 min")[0];
    expect(duration2).toBeInTheDocument();
  });
});
