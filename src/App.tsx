import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//css
import "./App.css";
//comps
import Login from "./components/Login/Login";
import { SearchWeather } from "./components/SearchWeather";
import { WeeklyForecast } from "components/WeeklyForecast/WeeklyForecast";
import { NotFound } from "components/NotFound";
import { DayForecastTable } from "components/DayForecastTable/DayForecastTable";
import { Favorites } from "components/Favorites";
import { Navigation } from "components/Navigation";
//types
import { IUserLogin } from "./types/form";
import { IWeatherApi } from "types/weather-api";

function App() {
  //fake database credentials
  const adminCredentails = {
    email: "admin@admin.com",
    password: "Admin123",
  };

  const USER = "USER";

  const date = new Date();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getFullYear();

  //hooks
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserLogin>({
    email: "",
    date: "",
  });
  const [loginError, setLoginError] = useState<string>("");
  const [weather, setWeather] = useState<IWeatherApi[]>([]);
  const [favorites, setFavorites] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const checkLoginData = (userData: { email: string; password: string }) => {
    if (
      userData.email &&
      userData.password !== "" &&
      userData.email === adminCredentails.email &&
      userData.password === adminCredentails.password
    ) {
      setLoginError("");
      navigate("/weather");
      setUser({ email: userData.email, date: day + "/" + month + "/" + year });
    } else if (
      userData.email !== adminCredentails.email ||
      userData.password !== adminCredentails.password
    ) {
      setLoginError("Login Failed. Your email and/or password do not match");
    }
  };

  useEffect(() => {
    const localData = localStorage.getItem(USER);
    if (localData) {
      setUser(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(USER, JSON.stringify(user));
  });

  return (
    <div className="container">
      <h1 className="text-center h1-lg">Weather App</h1>
      {user.email !== "" && <Navigation />}
      <Routes>
        <Route
          path="/"
          element={
            user.email === "" ? (
              <Login
                checkLoginData={checkLoginData}
                user={user}
                loginError={loginError}
              />
            ) : (
              <SearchWeather
                setUser={setUser}
                user={user}
                weather={weather}
                setWeather={setWeather}
                error={error}
                setError={setError}
                loading={loading}
                setLoading={setLoading}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            )
          }
        />
        <Route
          path="/weather"
          element={
            <SearchWeather
              setUser={setUser}
              user={user}
              weather={weather}
              setWeather={setWeather}
              error={error}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/weather/:city" element={<WeeklyForecast user={user} />} />
        <Route
          path="/weather/:city/:day"
          element={<DayForecastTable user={user} />}
        />
        <Route path="/weather/favorites" element={<Favorites user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
