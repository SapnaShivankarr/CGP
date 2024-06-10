import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Top() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loggedInRole, setLoggedRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("loggedIn="));
    const loginname = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("username="));
    const loginrole = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("usertype="));

    if (isLoggedIn && isLoggedIn.split("=")[1] === "true") {
      setLoggedInUser(loginname.split("=")[1]);
      setLoggedRole(loginrole.split("=")[1]);
    }
  }, []); // The empty dependency array ensures this effect runs only once

  const handleLogout = () => {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "usertype=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userbucketpath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "encryptedbucketpath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "finalresultbucketpath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "active=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "eventgcspath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "bomgcspath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.removeItem("uploadedImageData");
    navigate("/");
  };

  return (
    <div className="header row">
      <div className="col-2 logo">
        <h4>Fractals</h4>
      </div>
      <div className="col-4"></div>
      <div className="col-6 text-end">
        <span style={{ fontWeight: 600 }}>{loggedInUser}</span>
        {/* <span style={{ fontWeight: 600, fontSize: "16px", marginLeft: "2rem", color: "#0a6fcd" }}>{loggedInRole}</span> */}
        <button style={{ fontWeight: 600, fontSize: "16px", marginLeft: "2rem" }} onClick={handleLogout} className="btn btn-lg">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Top;
