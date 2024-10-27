import { useParams } from "react-router-dom";
import DetailLayout from "../../components/detail-layout/detail-layout";
import EpisodesList from "../../components/episodes-list/episodes-list";
import Sidebar from "../../components/sidebar/sidebar";
import { useCallback, useEffect, useState } from "react";
import { Episode, Result } from "../../types/detailTypes";
import { getPodcastDetailStorage } from "../../services/local-storage/local-storage";
import { usePodcastDetailConnect } from "../../hooks/usePodcastDetailConnect";
import LoadingIcon from "../../components/loading-icon.tsx/loading-icon";
import "./podcast-detail.css";

const PodcastDetail = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { getPodcastDetail } = usePodcastDetailConnect();
  const [details, setDetails] = useState<Result | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const fetchPodcastDetailData = useCallback(async () => {
    if (!podcastId) return;
    const { detailsQuery, episodesQuery } = await getPodcastDetail(podcastId);
    setDetails(detailsQuery);
    setEpisodes(episodesQuery);
  }, [podcastId, getPodcastDetail, setEpisodes]);

  useEffect(() => {
    if (!podcastId) return;
    const podcastStorage = getPodcastDetailStorage(podcastId);
    if (podcastStorage) {
      setDetails(podcastStorage.podcastDetails);
      setEpisodes(podcastStorage.episodes);
    } else {
      fetchPodcastDetailData();
    }
  }, [podcastId, fetchPodcastDetailData]);

  if (!details) return <LoadingIcon />;
  return (
    <>
      <div className="podcast-detail__container">
        <DetailLayout
          sidebar={
            <Sidebar
              id={details.trackId}
              image={details.artworkUrl600}
              title={details.trackName}
              artistName={details.artistName || ""}
            />
          }
          body={podcastId && <EpisodesList episodes={episodes} podcastId={podcastId} />}
        />
      </div>
    </>
  );
};

export default PodcastDetail;
