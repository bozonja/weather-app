import { FC, FormEvent, useState } from "react";

import "./Login.css";

const Login: FC = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(emailValue, passwordValue);
    setEmailValue("");
    setPasswordValue("");
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={emailValue}
          placeholder="enter email"
          onChange={(e) => setEmailValue(e.target.value)}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter valid email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={passwordValue}
          placeholder="enter password"
          onChange={(e) => setPasswordValue(e.target.value)}
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one  number and one uppercase and 
          lowercase letter, and at least 8 or more characters"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
