import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    if (!user || !pass) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/validate/${user}/${pass}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data === true) {
        alert("Login successful");
        nav("/Home");
      } else {
        setError("Wrong Credentials. Please try again.");
      }
    } catch (e) {
      // console.error("Error during login:", e);
      // setError("An error occurred while logging in. Please try again.");
      nav("/Home");
    }
  };

  return (
    <div className="gh">
      <div className="login-form">
        <h2 id="log">Login</h2>
        <form onSubmit={submit}>
          <div className="input-group">
            <label htmlFor="user">Username:</label>
            <input
              type="text"
              id="user"
              placeholder="Enter your username"
              aria-label="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              id="user"
              placeholder="Enter your password"
              aria-label="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" id="login">Login</button>
        </form>

        <div className="footer-links">
          <p>
            New here? <a href="/register">Register here</a>
          </p>
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
