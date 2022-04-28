import { FC, SetStateAction, Dispatch, useState } from "react";
import { Link } from "react-router-dom";

//types
import { IUserLogin } from "types/form";

interface IWeather {
  user: IUserLogin;
  setUser: Dispatch<SetStateAction<IUserLogin>>;
}

const Weather: FC<IWeather> = ({ user, setUser }) => {
  const [logOutNotification, setLogOutNotification] = useState(false);

  const handleLogout = () => {
    console.log("Logged out");
    setLogOutNotification(true);
    setUser({
      email: "",
    });
  };

  return (
    <>
      {user.email !== "" ? (
        <>
          <div className="text-right mb-lg">
            <button className="btn-link" onClick={handleLogout}>
              Log out
            </button>
          </div>
          <div>
            <input type="text" placeholder="City..." />
          </div>
        </>
      ) : (
        <>
          <p>
            {logOutNotification
              ? "You have been logged out."
              : "You must be logged in to use the app"}
          </p>
          <Link to="/">Back to login</Link>
        </>
      )}
    </>
  );
};

export default Weather;
