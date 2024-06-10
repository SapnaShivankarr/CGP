import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Components/Login";
import Select from "./Components/Select";
import Share from "./Components/Share";
import Signup from "./Components/Signup";
import Upload from "./Components/Upload";
import Campaigninvitation from "./Components/Campaigninvitation";
import ReviewsHeader from "./Components/ReviewHeader";
import File from "./Components/File";
import Dashboard from "./Components/Dashboard";
import Suppliers from "./Components/Suppliers";
import Top from "./Components/Top";
import Audit from "./Components/Audit";
import GeminiResponse from "./Components/GeminiResponse";
import "./Components/style.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("loggedIn="));
    const loginname = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("username="));

    if (isLoggedIn && isLoggedIn.split("=")[1] === "true") {
      setIsAuthenticated(true);
    } else if (location.pathname !== "/" && location.pathname !== "/signup") {
      navigate("/");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="App vh-100" style={{backgroundColor:'#ecf1fb'}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isAuthenticated && (
          <>
            <Route path="/select" element={<Select />} />
            <Route path="/review" element={<Upload />} />
            <Route path="/share" element={<Share />} />
            <Route path="/top" element={<Top />} />
            <Route path="/invite" element={<Campaigninvitation />} />
            <Route path="/upload" element={<File />} />
            <Route path="/confirm" element={<ReviewsHeader />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/gemini" element={<GeminiResponse />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
