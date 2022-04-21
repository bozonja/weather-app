import { FC } from "react";

import "./Login.css";

const Login: FC = () => {
  return (
    <div className="login">
      <h3>Please enter your credentials</h3>
      <div>
        <label>Email</label>
        <input type="text" placeholder="enter email" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" placeholder="enter password" />
      </div>
      <button type="submit">Login</button>
    </div>
  );
};

export default Login;
