import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { loginApi } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  //validating username and password
  const validate = () => {
    const err = {};
    if (!username.trim()) err.username = "Username is required";
    else if (username.trim() !== "1")
      err.username = "Invalid Username";
    if (!password.trim()) err.password = "Password is required";
    else if (password.trim() !== "1") err.password = "Invalid Password";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleLogin = async () => {
    console.log(username);
    console.log(password);

    try {
      setLoading(true);
    //   const res = await fetch(loginApi);
    //   const data = await res.json();
      if (validate()) { 
         localStorage.setItem("username", username);
         localStorage.setItem("token", "dummyToken");
        navigate("/dashboard", { replace: true });
        //alert("Login Successful"+ username);
      } else {
        alert("Invalid Credentials");
      }
    } catch (e) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2>Login</h2>
        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="error">{errors.username}</p>

        {/* Password with eye icon */}
        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "" : "👁"}
          </span>
        </div>
        <p className="error">{errors.password}</p>

        {/* Button */}
        <button onClick={handleLogin} disabled={loading}>
          Log in
        </button>

        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Login;

