import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      if (!username || !password) {
        throw new Error("Please fill in both username and password.");
      }
      // Make API call to authenticate user
      const response = await axios.post("http://localhost:9001/login-service/api/v1/authenticate/", {
        userName: username,
        pwd: password,
      });
      console.log(response);
      if (response.data.responseCode !== -1) {
        console.log(response);
        const data = response.data.responseData;
        console.log(data);
        document.cookie = "loggedIn=true; path=/";
        document.cookie = `username=${data.userName}; path=/`;
        document.cookie = `usertype=${data.userType}; path=/`;
        document.cookie = `userbucketpath=${data.userBucketPath}; path=/`;
        document.cookie = `encryptedbucketpath=${data.encryptedBucketPath}; path=/`;
        document.cookie = `finalresultbucketpath=${data.finalResultBucketPath}; path=/`;
        document.cookie = `active=${data.active}; path=/`;
        console.log("Login Successful!!");
        if (data.userType.toLowerCase() === "retailer") {
          navigate("/select");
        } else if (data.userType.toLowerCase() === "auditor") {
          navigate("/audit");
        } else {
          navigate("/invite");
        }
      } else {
        window.alert("Please Login Again");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid username or password.");
      } else {
        setError("Something went wrong, please try again");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bgcolor">
      <div className="shadow-lg secondary-color" style={{ width: "auto" }}>
        <h2 className="text-center my-4">CPG Solutions</h2>
        <p className="text-center mb-4">Enter your credentials</p>
        {error && <p className="text-danger text-center">{error}</p>}
        <form>
          <div className="mb-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg" />
          </div>
          <div className="mb-4">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
          </div>
          <button type="button" onClick={handleLogin} className="btn fractals-btn btn-lg w-100 mb-4">
            Login
          </button>
          <p className="text-center mb-0">
            <span className="text-danger">Don't have an account? </span>
            <Link to="/signup" className="text-primary link-color">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
