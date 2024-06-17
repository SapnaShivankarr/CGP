import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Loading from "../Loading/Loading";
import Header from "../Header/Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [lazy, setLazy] = useState(false);

  const handleLogin = async () => {
    setLazy(true);
    setError("");
    try {
      if (!username || !password) {
        throw new Error("Please fill in both username and password.");
      }
      // Make API call to authenticate user
      const response = await axios.post("https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/login-service/api/v1/authenticate/", {
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
        document.cookie = `nooffiles=0;path=/`;
        console.log("Login Successful!!");
        if (data.userType.toLowerCase() === "retailer") {
          navigate("/campaign");
        } else if (data.userType.toLowerCase() === "auditor") {
          navigate("/audit");
        } else {
          navigate("/invitation");
        }
      } else {
        window.alert("Please Login Again");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid username or password.");
      } else {
        setError(error.message);
      }
    }
  };
  if (lazy) {
    return (
      <div>
        <Header />
        <Loading />
      </div>
    );
  }

  return (
    <div className="wrapper login">
      <div className="container-cpg">
        <div className="row">
          <div className="col-lg-6 col-12 col-left login-container">
            <div className="login-text">
              <h2>Fractals</h2>
              <p>Sustainability data collaboration in the end-to-end consumer goods value chain!</p>{" "}
              <a href="/signup" className="btn">
                Sign Up
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-12 col-right">
            <div className="login-form">
              <h2>Login</h2>
              {error && <span className="text-danger text-center">{error}</span>}
              <form>
                <p>
                  {" "}
                  <label>
                    Username<span>*</span>
                  </label>{" "}
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />{" "}
                </p>
                <p>
                  {" "}
                  <label>
                    Password<span>*</span>
                  </label>{" "}
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />{" "}
                </p>

                <button type="button" onClick={handleLogin} className="btn p-1">
                  {" "}
                  Login{" "}
                </button>
                <p>
                  {" "}
                  <a href="">Forgot password?</a>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
