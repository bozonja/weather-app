import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//css
import "./weekly-forecast.css";
//types
import { IUserLogin } from "types/form";
import { IWeeklyForecastApi } from "types/weather-api";
//helpers
import { daysArray } from "helpers/consts";
import { api } from "helpers/consts";

export const WeeklyForecast: FC<{ user: IUserLogin }> = ({ user }) => {
  const { city } = useParams();

  const [forecast, setForecast] = useState<IWeeklyForecastApi[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${api.url}forecast/daily?&units=metric&q=${city}&cnt=5&appid=${api.key}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setError(null);
        setForecast(data.list);
      })

      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [city]);

  return (
    <>
      <h1>{city} Forecast</h1>
      {user.email !== "" && (
        <>
          {" "}
          {loading && <div>Loading...</div>}
          {error && <div className="error">{error}</div>}
          <div className="day-cards">
            {forecast &&
              forecast.map((item: IWeeklyForecastApi, i: number) => {
                let dateObj = new Date(item.dt * 1000);

                return (
                  <Link
                    key={i}
                    to={`/weather/${city}/${daysArray[dateObj.getDay()]}`}
                  >
                    <div className="day-card">
                      <p className="text-center">
                        {daysArray[dateObj.getDay()]}
                      </p>
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt=""
                      />
                      <div className="temp">
                        <div>
                          <p className="mb-0">Min:</p>
                          <p className="mt-0"> {Math.floor(item.temp.min)}°C</p>
                        </div>
                        <div>
                          <p className="mb-0">Max:</p>
                          <p className="mt-0"> {Math.floor(item.temp.max)}°C</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};
