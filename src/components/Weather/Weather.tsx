import { FC, SetStateAction, Dispatch, useState, FormEvent } from "react";
import { Link } from "react-router-dom";

//types
import { IWeatherApi } from "types/weather-api";
import { IUserLogin } from "types/form";
//css
import "./weather.css";
//helpers
import { daysArray } from "helpers/consts";
import { api } from "helpers/consts";

interface IWeather {
  user: IUserLogin;
  setUser: Dispatch<SetStateAction<IUserLogin>>;
  weather: IWeatherApi[];
  setWeather: Dispatch<SetStateAction<IWeatherApi[]>>;
  error: null | string;
  setError: Dispatch<SetStateAction<null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const Weather: FC<IWeather> = ({
  user,
  setUser,
  weather,
  setWeather,
  error,
  setError,
  loading,
  setLoading,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateObject = new Date();

  const [logOutNotification, setLogOutNotification] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");

  const searchCity = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${api.url}weather?q=${city}&units=metric&appid=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setError(null);
        setCity("");
        if (!weather.some((item: IWeatherApi) => item.id === data.id))
          setWeather([...weather, data]);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        setCity("");
      });
  };

  const handleLogout = () => {
    setLogOutNotification(true);
    setUser({
      email: "",
      date: "",
    });
  };

  const createDate = (dateObject: Date) => {
    const day = daysArray[dateObject.getDay()];
    const date = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    return `${day} ${date} ${month} ${year}`;
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
          <form onSubmit={searchCity}>
            <div className="form-group">
              <input
                type="text"
                placeholder="City..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button type="submit" disabled={weather.length === 10}>
                Search City
              </button>
            </div>
          </form>
          {error && <p className="error"> {error}</p>}
          {weather.length === 10 && (
            <p className="error">You´ve added max number of cities.</p>
          )}
          {loading && <p>Loading...</p>}
          <div className="weather-cards">
            {weather &&
              weather.map((item: IWeatherApi) => (
                <Link to={`/weather/${item.name}`} key={item.id}>
                  <div className="weather-card">
                    <h2 className="text-center mb-0">
                      {item.name}, {item.sys.country}
                    </h2>
                    <p className="text-center">{createDate(dateObject)}</p>
                    <h3 className="text-center font-lg mb-0">
                      {Math.floor(item.main.temp)}° C
                    </h3>
                    <p className="text-center">{item.weather[0].main}</p>
                  </div>
                </Link>
              ))}
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
