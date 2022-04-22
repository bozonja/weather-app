import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

interface ILogin {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [user, setUser] = useState<ILogin>({ email: "", password: "" });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUser({ email: "", password: "" });

    if (
      user.email &&
      user.password !== "" &&
      user.email === adminCredentails.email &&
      user.password === adminCredentails.password
    ) {
      navigate("/weather");
    } else if (
      user.email !== adminCredentails.email &&
      user.password !== adminCredentails.password
    )
      setError("Login Failed. Your email and/or password do not match");
  };

  const adminCredentails = {
    email: "admin@admin.com",
    password: "Admin123",
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={user.email}
          placeholder="enter email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter valid email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={user.password}
          placeholder="enter password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one  number and one uppercase and 
          lowercase letter, and at least 8 or more characters"
        />
      </div>
      {error ? (
        <>
          <p className="error">{error}</p>
          <button type="button" onClick={() => setError("")}>
            Try again
          </button>
        </>
      ) : (
        <button type="submit">Login</button>
      )}
    </form>
  );
};

export default Login;
