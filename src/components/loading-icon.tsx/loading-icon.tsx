import { FaSpinner } from "react-icons/fa";
import "./loading-icon.style.css";

const LoadingIcon = () => {
  return (
    <div className="loading-icon__container">
      <FaSpinner className="loading-icon__icon" size={30} color={"rgb(56, 84, 145)"} />{" "}
      <span className="loading-icon__text">Loading...</span>
    </div>
  );
};

export default LoadingIcon;
