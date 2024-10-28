import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import PodcastDetail from "../pages/podcast-detail/podcast-detail";
import EpisodeDetail from "../pages/episode-detail/episode-detail";


function PodcastRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
      <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
}
export default PodcastRoutes;