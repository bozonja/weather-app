import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//css
import "./weather-details.css";
//types
import { IWeatherDetailsApi } from "types/weather-api";
//helpers
import { daysArray } from "helpers/helpers";
import { api } from "helpers/helpers";

export const WeatherDetails: FC = () => {
  const { city } = useParams();

  const [forecast, setForecast] = useState<IWeatherDetailsApi[]>([]);
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
  }, []);

  return (
    <>
      <h1>{city} Forecast</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="day-cards">
        {forecast &&
          forecast.map((item: IWeatherDetailsApi, i: number) => {
            let dateObj = new Date(item.dt * 1000);

            return (
              <div key={i} className="day-card">
                <p className="text-center">{daysArray[dateObj.getDay()]}</p>
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
            );
          })}
      </div>
    </>
  );
};
