import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import CustomModal from "../Chatbot/CustomModal";

function Header() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loggedInRole, setLoggedRole] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
    document.cookie = "fileUrl=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "fileName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "CampaignId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "nooffiles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "manufactureevent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "manufacturebom=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.removeItem("uploadedImageData");
    navigate("/");
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <header class="header">
      <div class="app-name">Fractals</div>
      <div class="user-controls">
        <button type="button" className="btn btn-primary" onClick={handleShowModal}>
          Launch demo modal
        </button>

        <CustomModal show={showModal} handleClose={handleCloseModal} title="Fractals Chatbot">
          <p>...</p>
        </CustomModal>
        <div class="username">{loggedInUser}</div>
        <button class="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
