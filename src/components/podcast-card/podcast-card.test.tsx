import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import { Entry } from "../../types/list-types";
import PodcastCard from "./podcast-card";

describe("PodcastCard Component", () => {
  const mockPodcastItem: Entry = {
    "im:name": { label: "Podcast Title" },
    "im:image": [{label:"https://is1.png",attributes:{"height":"55"}},
        {label:"https://is2.png",attributes:{"height":"55"}},
        {label:"https://is3.png",attributes:{"height":"55"}}
    ],
    category: {
      attributes: {
        "im:id": "string",
        term: "string",
        scheme: "string",
        label: "string",
      },
    },
    "im:releaseDate": {
      label: "string",
      attributes: {
        label: "string",
      },
    },
    summary: { label: "summaryMock" },
    "im:artist": { label: "Artist Name" },
    title: {
        label: "string",
      },
      link: {attributes:  {
        rel: "string",
        type: "string",
        href: "string",
      }},
    "im:contentType": {
        attributes: {
            term: "string",
            label: "string",
          },
      },
    "im:price": {
        label: "string",
        attributes: {
            amount: "string",
            currency: "string",
      },
    },
    id: {
        label: "string",
        attributes: {
            "im:id": "string",
          },
      },
  };


  
  it("should render the podcast card with correct information", () => {
    render(
      <MemoryRouter>
        <PodcastCard podcastItem={mockPodcastItem} />
      </MemoryRouter>
    );

    expect(screen.getByText("Podcast Title")).toBeInTheDocument();
    expect(screen.getByText("Author: Artist Name")).toBeInTheDocument();

    const imageElement = screen.getByAltText("Artist Name");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "https://is3.png");

    const linkElement = screen.getByTestId("link-podcast-card");
    expect(linkElement).toHaveAttribute("href", "/podcast/string");
  });
});
