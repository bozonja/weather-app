import { FC } from "react";
import { Link } from "react-router-dom";

export const NotFound: FC = () => {
  return (
    <>
      <h1>404. Page can not be found.</h1>
      <Link to="/">Go home</Link>
    </>
  );
};
