import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//helpers
import { daysArray } from "helpers/consts";
import { api } from "helpers/consts";
//types
import { IDayForecastApi } from "types/weather-api";

export const DayForecastTable: FC = () => {
  const { day, city } = useParams();

  const [dayArray, setDayArray] = useState<IDayForecastApi[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${api.url}forecast?&units=metric&q=${city}&appid=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setError(null);
        setDayArray(data.list);
      })

      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [city]);

  const addZero = (i: string | number) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  return (
    <div>
      <h2>{day}</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Hour</th>
            <th>Weather</th>
            <th>Temp</th>
          </tr>
        </thead>
        <tbody>
          {dayArray &&
            dayArray
              .filter(
                (item: IDayForecastApi) =>
                  daysArray[new Date(item.dt * 1000).getDay()] === day
              )
              .map((item: IDayForecastApi) => {
                let dateObj = new Date(item.dt * 1000);
                return (
                  <tr key={item.dt_txt}>
                    <td>
                      {addZero(dateObj.getUTCHours())}:{dateObj.getUTCMinutes()}
                      {dateObj.getUTCSeconds()}
                    </td>
                    <td>
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </td>
                    <td>{Math.floor(item.main.temp)}°C</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};
