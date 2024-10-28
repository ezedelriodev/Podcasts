import { FC } from "react";
import { Link } from "react-router-dom";
import { Entry } from "../../types/list-types";
import "./podcast-card.css";

interface Props {
  podcastItem: Entry;
}

const PodcastCard: FC<Props> = (props) => {
  const { podcastItem } = props;

  return (
    <Link
      data-testid="link-podcast-card"
      to={`/podcast/${podcastItem.id.attributes["im:id"]}`}
      className="card__container"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card__rectangle">
        <div className="card__title">{podcastItem["im:name"].label}</div>
        <div className="card__author">Author: {podcastItem["im:artist"].label}</div>
      </div>
      <div className="card__circle">
        <img src={podcastItem["im:image"][2].label} alt={podcastItem["im:artist"].label} className="card__image" />
      </div>
    </Link>
  );
};

export default PodcastCard;
