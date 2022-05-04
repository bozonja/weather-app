import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//css
import "./App.css";
//comps
import Login from "./components/Login/Login";
import Weather from "./components/Weather/Weather";
import { WeatherDetails } from "components/WeatherDetails/WeatherDetails";
import { NotFound } from "components/NotFound";
//types
import { IUserLogin } from "./types/form";

function App() {
  //fake database credentials
  const adminCredentails = {
    email: "admin@admin.com",
    password: "Admin123",
  };

  const date = new Date();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getFullYear();

  const [user, setUser] = useState<IUserLogin>({
    email: "",
    date: "",
  });
  const USER = "USER";

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const checkLoginData = (userData: { email: string; password: string }) => {
    if (
      userData.email &&
      userData.password !== "" &&
      userData.email === adminCredentails.email &&
      userData.password === adminCredentails.password
    ) {
      setError("");
      navigate("/weather");
      setUser({ email: userData.email, date: day + "/" + month + "/" + year });
    } else if (
      userData.email !== adminCredentails.email ||
      userData.password !== adminCredentails.password
    ) {
      setError("Login Failed. Your email and/or password do not match");
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
      <Routes>
        <Route
          path="/"
          element={
            user.email === "" ? (
              <Login
                checkLoginData={checkLoginData}
                user={user}
                error={error}
              />
            ) : (
              <Weather setUser={setUser} user={user} />
            )
          }
        />
        <Route
          path="/weather"
          element={<Weather setUser={setUser} user={user} />}
        />
        <Route path="/weather/:city" element={<WeatherDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
