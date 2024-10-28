import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePodcastListConnect } from "./use-podcast-list.connect";
import { getApi } from "../services/api/get-api";
import { getPodcastListStorage, savePodcastListStorage } from "../services/local-storage/local-storage";
import { vi, describe, it, expect } from "vitest";

vi.mock("../services/local-storage/local-storage", () => ({
  getPodcastListStorage: vi.fn(),
  savePodcastListStorage: vi.fn(),
}));

vi.mock("../services/api/get-api", () => ({
  getApi: {
    get: vi.fn(),
  },
}));
const createQueryClient = () => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("usePodcastListConnect", () => {
  it("should return podcast list from local storage if available", async () => {
    const mockPodcastList = { id: 1, name: "Sample Podcast" };

    (getPodcastListStorage as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPodcastList);
    const queryClient = createQueryClient();

    const { result } = renderHook(() => usePodcastListConnect(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      });

    await waitFor(() => expect(result.current.data).toEqual(mockPodcastList));
    expect(getPodcastListStorage).toHaveBeenCalled();
    expect(getApi.get).not.toHaveBeenCalled();
  });

  it("should fetch podcast list from API and save to local storage if not available in local storage", async () => {
    const mockPodcastList = { id: 2, name: "Another Podcast" };

    (getPodcastListStorage as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (getApi.get as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ data: mockPodcastList });
    const queryClient = createQueryClient();

    const { result } = renderHook(() => usePodcastListConnect(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      });

    await waitFor(() => expect(result.current.data).toEqual(mockPodcastList));
    expect(getPodcastListStorage).toHaveBeenCalled();
    expect(getApi.get).toHaveBeenCalledWith("/us/rss/toppodcasts/limit=100/genre=1310/json");
    expect(savePodcastListStorage).toHaveBeenCalledWith(mockPodcastList); 
  });

  it("should handle errors when fetching from API", async () => {
   
    (getPodcastListStorage as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (getApi.get as unknown as ReturnType<typeof vi.fn>).mockReturnValue(new Error("Network Error"));
    const queryClient = createQueryClient();


    const { result } = renderHook(() => usePodcastListConnect(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined(); 
    expect(getPodcastListStorage).toHaveBeenCalled();
    expect(getApi.get).toHaveBeenCalled();
  });
});
