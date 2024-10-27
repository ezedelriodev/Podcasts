
import { getApi } from "../services/api/get-api";
import { savePodcastDetailStorage } from "../services/local-storage/local-storage";
import { DetailPodcast, Episode, Result } from "../types/detailTypes";

export const usePodcastDetailConnect = () => {
  const getPodcastDetail = async (podcastId: string): Promise<{ detailsQuery: Result; episodesQuery: Episode[] }> => {
    try {
      const { data } = await getApi.get<DetailPodcast>(
        `/lookup?id=${podcastId}&country=US&media=podcast&entity=podcastEpisode`,
      );
      const detailsQuery: Result = data.results[0];
      const episodesQuery: Episode[] = data.results;
      savePodcastDetailStorage(podcastId, detailsQuery, episodesQuery);

      return { detailsQuery, episodesQuery };
    } catch (error) {
      console.error("Error searching for episodes listing:", error);
      throw error;
    }
  };
  return { getPodcastDetail };
};
