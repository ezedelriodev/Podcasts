import { useQuery } from "@tanstack/react-query";
import { getApi } from "../services/api/get-api";
import { Podcast } from "../types/list-types";
import { getPodcastListStorage, savePodcastListStorage } from "../services/local-storage/local-storage";

const getPodcastList = async (): Promise<Podcast> => {
  const podcastListStorage = getPodcastListStorage();

  if (podcastListStorage) {
    return podcastListStorage;
  } else {
    try {
      const { data } = await getApi.get<Podcast>("/us/rss/toppodcasts/limit=100/genre=1310/json");
      savePodcastListStorage(data);
      return data;
    } catch (error) {
      console.error("Error searching for podcast listing:", error);
      throw error;
    }
  }
};

export const usePodcastListConnect = () => {
  const podcastListQuery = useQuery({
    queryKey: ["podcastList"],
    queryFn: getPodcastList,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return podcastListQuery;
};
