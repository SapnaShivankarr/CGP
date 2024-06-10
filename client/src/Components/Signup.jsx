import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="bgcolor vh-100">
      <div className="d-flex justify-content-center align-items-center">
        <div className="shadow-lg secondary-color mt-4" style={{ width: "auto" }}>
          <h2 className="text-center my-4">Sign Up</h2>
          <p className="text-center mb-4">Create your account</p>
          {error && <p className="text-danger text-center">{error}</p>}
          <form>
            <div className="mb-4">
              <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select form-select-lg">
                <option value="">Select Role</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="retailer">Retailer</option>
                <option value="processor">Processor</option>
                <option value="lsp">LSP</option>
                <option value="farmer">Farmer</option>
                <option value="auditor">Auditor</option>
              </select>
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg" />
            </div>
            <div className="mb-4">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
            </div>
            <div className="mb-4">
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control form-control-lg" />
            </div>
            <button type="button" onClick={handleSignup} className="btn fractals-btn btn-lg w-100 mb-3">
              Sign Up
            </button>
            <p className="text-center mb-0">
              Already have an account?{" "}
              <Link to="/" className="login-link link-color">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
