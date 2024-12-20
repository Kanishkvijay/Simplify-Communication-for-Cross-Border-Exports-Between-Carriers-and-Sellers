import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [retype, setRetype] = useState("");
  const [role, setRole] = useState(""); // Adding role field
  const nav = useNavigate();

  const register = async (event) => {
    event.preventDefault();

    if (pass !== retype) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/ChatBot/Users",
        {
          id: null, // You can either set it to null, or let the database auto-generate the ID.
          username,
          password: pass,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Registered Successfully");
      nav("/Login");
      console.log(response.data);
    } catch (e) {
      console.error("Error: " + e.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div id="brandname" className="col d-flex justify-content-center align-items-center">
          <p className="mt-0 mb-0">Crumble</p>
        </div>
      </div>
      <div className="row d-flex flex-column justify-content-center align-items-center" id="form">
        <div className="col-12 col-sm-6 d-flex flex-column justify-content-center align-items-center mt-5 mt-sm-0">
          <div id="formborder">
            <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={register}>
              <div id="loginname">Sign Up</div>
              <div>
                <div id="emailinput">
                  <label>
                    <i className="fa-solid fa-envelope"></i>
                  </label>
                  <input
                    type="email"
                    placeholder="E-Mail"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div id="passinput">
                  <label>
                    <i className="fa-solid fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
                <div id="passinput">
                  <label>
                    <i className="fa-solid fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={retype}
                    onChange={(e) => setRetype(e.target.value)}
                  />
                </div>
                <div id="roleinput">
                  <label>
                    <i className="fa-solid fa-user-tag"></i>
                  </label>
                  <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div id="sub" className="col-12 d-flex flex-column justify-content-center align-items-center">
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div id="regside" className="col-12 col-sm-6 d-flex flex-column justify-content-center align-items-center">
          <p>Already have an Account?</p>
          <Link to="/Login">Click Here</Link>
        </div>
      </div>
      <footer>
        <div className="container-fluid p-0">
          <div className="row">
            <div id="footername" className="col d-flex flex-column justify-content-center align-items-center">
              <p className="m-0">
                <i className="fa fa-copyright"></i> Crumble 2024
              </p>
              <a href="#1">Enjoy your Meals with Crumble!!!</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;
