import LoadingIcon from "../../components/loading-icon.tsx/loading-icon";
import { usePodcastListConnect } from "../../hooks/use-podcast-detail.connect";

const Home = () => {
  const podcastListQuery = usePodcastListConnect();

  return (
    <>
      {podcastListQuery.isFetching && <LoadingIcon />}
      <div>Home</div>
    </>
  );
}

export default Home