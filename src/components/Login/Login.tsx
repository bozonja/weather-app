import { FC, FormEvent, useState } from "react";

//css
import "./Login.css";
//types
import { IUserData } from "types/form";
import { EyeIcon } from "assets/eyeIcon/EyeIcon";
import { EyeSlashIcon } from "assets/EyeSlashIcon";
//assets
// import eyeIcon from "assets/eyeIcon.svg";

interface ILogin {
  user: { email: string };
  error: string;
  checkLoginData: (userData: { email: string; password: string }) => void;
}

const Login: FC<ILogin> = ({ checkLoginData, error, user }) => {
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    checkLoginData(userData);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
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
      <div className="form-group">
        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
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
        {/* <img src={eyeIcon} alt=""/> */}
        {showPassword ? (
          <EyeSlashIcon onClick={togglePassword} />
        ) : (
          <EyeIcon onClick={togglePassword} />
        )}
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
