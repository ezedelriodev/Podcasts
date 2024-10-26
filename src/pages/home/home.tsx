import { usePodcastListConnect } from "../../hooks/use-podcast-detail.connect";

const Home = () => {
  const podcastListQuery = usePodcastListConnect();

  console.log("podcastListQuery", podcastListQuery)
  return (
    <div>Home</div>
  )
}

export default Home