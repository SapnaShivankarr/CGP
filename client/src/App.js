import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Components/Login/Login";
import LaunchCampaign from "./Components/LaunchCampaign/LaunchCampaign";
import Share from "./Components/ShareCarbonFootprint/ShareCarbonFootprint";
import Signup from "./Components/Login/Signup";
import ReviewCampaign from "./Components/ReviewCampaign/ReviewCampaign";
import Campaigninvitation from "./Components/CampaignInvitation/Campaigninvitation";
import Upload from "./Components/Upload/Upload";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import Audit from "./Components/Audit/Audit";
import GeminiResponse from "./Components/Upload/GeminiResponse";
import "../src/CommonStyle/style.css";
import HelpButtonWithModal from "./Components/Help/Help";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuditor, setAuditor] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("loggedIn="));
    const loginname = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("username="));

    if (isLoggedIn && isLoggedIn.split("=")[1] === "true") {
      setIsAuthenticated(true);
      const usertype = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("usertype="))
        .split("=")[1];
      if (usertype.toLowerCase() === "auditor") {
        setAuditor(true);
      }
    } else if (location.pathname !== "/" && location.pathname !== "/signup") {
      navigate("/");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isAuthenticated && (
            <>
              <Route path="/campaign" element={<LaunchCampaign />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/share" element={<Share />} />
              <Route path="/header" element={<Header />} />
              <Route path="/invitation" element={<Campaigninvitation />} />
              <Route path="/review" element={<ReviewCampaign />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/response" element={<GeminiResponse />} />
            </>
          )}
          {isAuditor && (
            <>
              <Route path="/audit" element={<Audit />} />
            </>
          )}
        </Routes>
      </div>
      {location.pathname !== "/" && location.pathname !== "/signup" && <HelpButtonWithModal />}
    </div>
  );
}

export default App;
