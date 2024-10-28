import { FC } from "react";
import "./detail-layout.css";

interface Props {
  sidebar: React.ReactNode;
  body: React.ReactNode;
}

const DetailLayout: FC<Props> = (props) => {
  const { sidebar, body } = props;
  return (
    <div className="detail-layout__container">
      <div>{sidebar}</div>
      <div>{body}</div>
    </div>
  );
};

export default DetailLayout;
