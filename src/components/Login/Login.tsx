import { FC, FormEvent, useState } from "react";

import "./Login.css";

//types
import { IUserLogin } from "../../types/form";

interface ILogin {
  error: string;
  handleLogin: (userData: { email: string; password: string }) => void;
}

const Login: FC<ILogin> = ({ handleLogin, error }) => {
  const [userData, setUserData] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin(userData);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={userData.email}
          placeholder="enter email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter valid email"
        />
      </div>
      <div>
        <label>Password</label>
        {/* TODO: add toggle password icon */}
        <input
          type="password"
          value={userData.password}
          placeholder="enter password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one  number and one uppercase and 
          lowercase letter, and at least 8 or more characters"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
