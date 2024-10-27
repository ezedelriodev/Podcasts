import { FC, useEffect, useState } from "react";
import { Episode } from "../../types/detailTypes";
import React from "react";
import { Link } from "react-router-dom";
import { convertMillisecondsToTime, formatDate } from "../../helpers/helpers";
import "./episodes-list..css"

interface Props {
  episodes: Episode[];
  podcastId: string;
}

const EpisodesList: FC<Props> = (props) => {
  const { episodes, podcastId } = props;
  const [customEpisodes, setCustomEpisodes] = useState(episodes);

  useEffect(() => {
    const copyEpisodes = [...episodes];
    setCustomEpisodes(copyEpisodes.splice(1));
  }, [episodes]);

  return (
    <div className="episodes-list__container">
      <div className="episodes-list__counter">
        <h3>Episodes: {customEpisodes.length}</h3>
      </div>
      <div className="episodes-list__table-container">
        <div className="episodes-list__table">
          <div className="episodes-list__table-header">Title</div>
          <div className="episodes-list__table-header">Date</div>
          <div className="episodes-list__table-header align-end">Duration</div>

          {customEpisodes.map((episode, index) => (
            <React.Fragment key={episode.trackId}>
              <div
                className={`episodes-list__table-row ${index % 2 === 0 ? "episodes-list__table-row--background" : ""}`}
              >
                <Link className="episodes-list__table-link" to={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                  {episode.trackName}
                </Link>
              </div>
              <div
                className={`episodes-list__table-row ${index % 2 === 0 ? "episodes-list__table-row--background" : ""}`}
              >
                {episode.releaseDate && formatDate(episode.releaseDate)}
              </div>
              <div
                className={`episodes-list__table-row align-end ${
                  index % 2 === 0 ? "episodes-list__table-row--background" : ""
                }`}
              >
                {episode.trackTimeMillis && convertMillisecondsToTime(episode.trackTimeMillis)}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodesList;
