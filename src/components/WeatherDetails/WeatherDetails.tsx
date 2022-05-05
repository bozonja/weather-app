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

  // TODO: fix types properly
  const [forecast, setForecast] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      // TODO: REPLACE lat and lot with real data
      `${api.url}onecall?&units=metric&lat=43.7036&lon=16.6394&exclude={current,minutely,hourly,alerts}&appid=${api.key}`
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
        setForecast(data.daily);
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
          forecast.map((item: any, i: any) => {
            let dateObj = new Date(item.dt * 1000);
            if (i <= 4) {
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
            }
          })}
      </div>
    </>
  );
};
