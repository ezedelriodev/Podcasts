import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="header__container">
      <Link to="/home" className="header__link">
        Podcaster
      </Link>
    </header>
  );
};

export default Header;