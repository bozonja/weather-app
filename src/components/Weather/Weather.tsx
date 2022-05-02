import { FC, SetStateAction, Dispatch, useState, FormEvent } from "react";
import { Link } from "react-router-dom";

//types
import { IWeatherApi } from "types/weather-api";
import { IUserLogin } from "types/form";

interface IWeather {
  user: IUserLogin;
  setUser: Dispatch<SetStateAction<IUserLogin>>;
}

const Weather: FC<IWeather> = ({ user, setUser }) => {
  const api = {
    key: "7cb40073f41142bd9bb5979928aa8810",
    url: "https://api.openweathermap.org/data/2.5/",
  };

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

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateObject = new Date();

  const [logOutNotification, setLogOutNotification] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState<IWeatherApi>({
    name: "",
    sys: { country: "" },
    main: { temp: 0 },
    weather: [],
  });

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
        console.log(data);
        setLoading(false);
        setError(null);
        setCity("");
        setWeather(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        setCity("");
      });
  };

  const handleLogout = () => {
    console.log("Logged out");
    setLogOutNotification(true);
    setUser({
      email: "",
      date: "",
    });
  };

  const createDate = (dateObject: Date) => {
    const day = days[dateObject.getDay()];
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
              <button type="submit">
                {loading ? "Loading..." : "Search City"}
              </button>
            </div>
          </form>
          {error && <p className="error"> {error}</p>}
          {weather.name && (
            <div>
              <h2 className="text-center mb-0">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-center">{createDate(dateObject)}</p>
              <h3 className="text-center font-lg mb-0">
                {Math.floor(weather.main.temp)}° C
              </h3>
              <p className="text-center">{weather.weather[0].main}</p>
            </div>
          )}
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
