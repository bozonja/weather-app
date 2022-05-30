import { FC } from "react";
import { Link } from "react-router-dom";

export const Navigation: FC = () => {
  return (
    <ul className="navigation">
      <li className="navigation-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navigation-item">
        <Link to="/weather/favorites">My favs</Link>
      </li>
    </ul>
  );
};
