import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//css
import "./App.css";
//comps
import Login from "./components/Login/Login";
import Weather from "./components/Weather/Weather";
//types
import { IUserLogin } from "./types/form";

function App() {
  const navigate = useNavigate();
  const adminCredentails = {
    email: "admin@admin.com",
    password: "Admin123",
  };

  const [user, setUser] = useState<IUserLogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleLogin = (userData: { email: string; password: string }) => {
    if (
      userData.email &&
      userData.password !== "" &&
      userData.email === adminCredentails.email &&
      userData.password === adminCredentails.password
    ) {
      setUser({ email: userData.email, password: userData.password });

      setError("");
      navigate("/weather");
      console.log("Logged in");
    } else if (
      userData.email !== adminCredentails.email ||
      userData.password !== adminCredentails.password
    ) {
      setError("Login Failed. Your email and/or password do not match");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Weather App</h1>
      <Routes>
        <Route
          path="/"
          element={<Login handleLogin={handleLogin} error={error} />}
        />
        <Route
          path="/weather"
          element={<Weather setUser={setUser} user={user} />}
        />
      </Routes>
    </div>
  );
}

export default App;
