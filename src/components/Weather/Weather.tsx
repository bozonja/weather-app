import { FC, SetStateAction, Dispatch, useState } from "react";
import { Link } from "react-router-dom";

//types
import { IUserLogin } from "types/form";

interface IWeather {
  user: IUserLogin;
  setUser: Dispatch<SetStateAction<IUserLogin>>;
}

const Weather: FC<IWeather> = ({ user }) => {
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    console.log("Logged out");
    setLoggedOut(true);
  };

  return (
    <>
      {user.email !== "" && (
        <>
          {loggedOut ? (
            ""
          ) : (
            <div className="text-right">
              <button className="btn-link" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
        </>
      )}
      {loggedOut && (
        <>
          <p>You have been logged out.</p>
          <Link to="/">Back to home</Link>
        </>
      )}
    </>
  );
};

export default Weather;
