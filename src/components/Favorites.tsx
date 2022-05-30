import { FC } from "react";
import { Link } from "react-router-dom";

//helpers
import { createDate } from "helpers/functions";
import { dateObject } from "helpers/consts";
//types
import { IUserLogin } from "../types/form";

export const Favorites: FC<{ user: IUserLogin }> = ({ user }) => {
  const favsArray = JSON.parse(localStorage.getItem("FAVORITES") || "{}");

  return (
    <>
      <h1>Favs</h1>
      {user.email !== "" && (
        <div className="weather-cards">
          {favsArray.map((item: any) => (
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
            </div>
          ))}
        </div>
      )}
    </>
  );
};
