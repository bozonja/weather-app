import { Routes, Route } from "react-router-dom";

//css
import "./App.css";
//comps
import Login from "./components/Login/Login";
import Weather from "./components/Weather/Weather";

function App() {
  return (
    <div className="container">
      <h1 className="text-center">Weather App</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
