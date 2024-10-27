import { FC } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { usePodcastListConnect } from "../../hooks/use-podcast-list.connect";
import "./sidebar.css";

interface Props {
  id: number;
  image: string;
  title: string;
  artistName: string;
}

const Sidebar: FC<Props> = (props) => {
  const { id, image, title, artistName } = props;
  const podcastListQuery = usePodcastListConnect();
  const data = podcastListQuery.data;
  const { pathname } = useLocation();

  const isEpisodeScreen = pathname
    .split("/")
    .filter((element) => element !== "")
    .includes("episode");

  const searchDescription = () => {
    return data?.feed.entry.find((element) => element.id.attributes["im:id"] === id?.toString())?.summary.label;
  };

  return (
    <>
      {!podcastListQuery.isFetching && (
        <aside className="sidebar__container">
          <Link to={`/podcast/${id}`} className={`sidebar__image ${isEpisodeScreen ? "" : "link-no-cursor"}`}>
            <img className="podcast-detail__artwork" src={image} alt={title} />
          </Link>

          <hr className="sidebar__line" />
          <div className="sidebar__info">
            <Link
              to={`/podcast/${id}`}
              className={`sidebar__title ${isEpisodeScreen ? "" : "link-no-cursor"}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {title}
            </Link>

            <Link
              to={`/podcast/${id}`}
              className={`sidebar__author ${isEpisodeScreen ? "" : "link-no-cursor"}`}
              style={{ textDecoration: "none" }}
            >
              By: {artistName}
            </Link>

            <hr className="sidebar__line" />

            <header>
              <h4 className="sidebar__header-description">Description:</h4>
            </header>
            <section>
              <p
                className="sidebar__description"
                dangerouslySetInnerHTML={{ __html: searchDescription()?.replace(/\n/g, "<br />") as string }}
              />
            </section>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
