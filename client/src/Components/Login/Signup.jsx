import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    try {
      if (!username || !password || !confirmPassword || !role) {
        throw new Error("Please fill in all fields");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post("https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/user-service/api/v1/user/", {
        userName: username,
        pwd: password,
        userType: role,
        active: true,
        userBucketPath: `BUCKET/${role.toUpperCase()}`,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        // document.cookie = "loggedIn=true; path=/";
        // document.cookie = `username=${username}; path=/`;
        // document.cookie = `userType=${role}; path=/`;
        console.log("Signup Successful. Please Login");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="wrapper login">
      <div className="container-cpg">
        <div className="row">
          <div className="col-lg-6 col-12 col-left login-container">
            <div className="login-text">
              <h2>Fractals</h2>
              <p>Sustainability data collaboration in the end-to-end consumer goods value chain!</p>{" "}
              <a href="/" className="btn">
                Login
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-12 col-right">
            <div className="login-form">
              <h2>Sign Up</h2>
              {error && <p className="text-danger text-center">{error}</p>}
              <form action="">
                <p>
                  <label>
                    Select Role<span>*</span>
                  </label>{" "}
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select form-select-lg">
                    <option value="">Select Role</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="retailer">Retailer</option>
                    <option value="processor">Processor</option>
                    <option value="lsp">LSP</option>
                    <option value="farmer">Farmer</option>
                    <option value="auditor">Auditor</option>
                  </select>
                </p>
                <p>
                  {" "}
                  <label>
                    Username<span>*</span>
                  </label>{" "}
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />{" "}
                </p>
                <p>
                  {" "}
                  <label>
                    Password<span>*</span>
                  </label>
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />{" "}
                </p>

                <p>
                  {" "}
                  <label>
                    Confirm Password<span>*</span>
                  </label>{" "}
                  <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />{" "}
                </p>
                <button type="button" onClick={handleSignup} className="btn p-1">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
