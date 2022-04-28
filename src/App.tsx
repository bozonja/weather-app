import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//css
import "./App.css";
//comps
import Login from "./components/Login/Login";
import Weather from "./components/Weather/Weather";
//types
import { IUserLogin } from "./types/form";

function App() {
  //fake database
  const adminCredentails = {
    email: "admin@admin.com",
    password: "Admin123",
  };
  const date = new Date();

  const [user, setUser] = useState<IUserLogin>({ email: "" });
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
      setUser({ email: userData.email });
      console.log("Logged in", userData.email);
    } else if (
      userData.email !== adminCredentails.email ||
      userData.password !== adminCredentails.password
    ) {
      setError("Login Failed. Your email and/or password do not match");
    }
  };

  console.log(user);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user) + " " + date);
  }, [user]);

  return (
    <div className="container">
      <h1 className="text-center">Weather App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <Login checkLoginData={checkLoginData} user={user} error={error} />
          }
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
