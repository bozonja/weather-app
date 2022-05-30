import {
  FC,
  SetStateAction,
  Dispatch,
  useState,
  FormEvent,
  useEffect,
} from "react";
import { Link } from "react-router-dom";

//types
import { IWeatherApi } from "types/weather-api";
import { IUserLogin } from "types/form";
//helpers
import { api, dateObject } from "helpers/consts";
import { createDate } from "helpers/functions";
//assets
import { TrashIcon } from "assets/TrashIcon";
import { StarIcon } from "assets/StarIcon";

interface ISearchWeather {
  user: IUserLogin;
  setUser: Dispatch<SetStateAction<IUserLogin>>;
  weather: IWeatherApi[];
  setWeather: Dispatch<SetStateAction<IWeatherApi[]>>;
  error: null | string;
  setError: Dispatch<SetStateAction<null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  favorites: IWeatherApi[];
  setFavorites: Dispatch<SetStateAction<any>>;
}

export const SearchWeather: FC<ISearchWeather> = ({
  user,
  setUser,
  weather,
  setWeather,
  error,
  setError,
  loading,
  setLoading,
  favorites,
  setFavorites,
}) => {
  const FAVORITES = "FAVORITES";

  useEffect(() => {
    const localData = localStorage.getItem(FAVORITES);
    if (localData) {
      setFavorites(JSON.parse(localData));
    }
  }, [setFavorites]);

  useEffect(() => {
    localStorage.setItem(FAVORITES, JSON.stringify(favorites));
  });

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

  const deleteCity = (id: number | undefined) => {
    let filteredWeather = weather.filter((item) => item.id !== id);
    setWeather(filteredWeather);
  };

  const addToFavorite = (name: string) => {
    const weatherData = weather.find((item) => item.name === name);
    if (!favorites.some((item: any) => item.name === name)) {
      setFavorites([...favorites, weatherData]);
    }
  };

  return (
    <>
      {user.email !== "" ? (
        <div>
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
                <div className="weather-card" key={item.id}>
                  <Link to={`/weather/${item.name}`}>
                    <h2 className="text-center mb-0">
                      {item.name}, {item.sys.country}
                    </h2>
                    <p className="text-center">{createDate(dateObject)}</p>
                    <h3 className="text-center font-lg mb-0">
                      {Math.floor(item.main.temp)}° C
                    </h3>
                    <p className="text-center">{item.weather[0].main}</p>
                  </Link>
                  <div className="weather-card-footer">
                    <div onClick={() => addToFavorite(item.name)}>
                      <StarIcon />
                    </div>
                    <div onClick={() => deleteCity(item.id)}>
                      <TrashIcon />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
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
