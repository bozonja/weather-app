import { FC, SetStateAction, Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";

//types
//TODO add relative imports
import { IUserLogin } from "../../types/form";

interface IWeather {
  user: IUserLogin;
  setUser: Dispatch<SetStateAction<IUserLogin>>;
}

const Weather: FC<IWeather> = ({ user }) => {
  const navigate = useNavigate();

  const [loggedOut, setLoggedOut] = useState(false);

  const onBackToHome = () => {
    navigate("/");
  };

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
              {/* TODO: add href link insted of button */}
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </>
      )}
      {loggedOut && (
        <>
          <p>You have been logged out.</p>
          <button onClick={onBackToHome}>Back to home</button>
        </>
      )}
    </>
  );
};

export default Weather;
