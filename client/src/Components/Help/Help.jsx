import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./HelpButtonWithModal.css";
import CustomModal from "../Chatbot/CustomModal";

const HelpButtonWithModal = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const chatshow = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("chatshow="));
    const chatvalue = chatshow ? chatshow.split("=")[1] : undefined;
    if (chatvalue === "true") {
      setShowModal(true);
    }
  }, [showModal]);

  const handleShowModal = () => {
    setShowModal(true);
    document.cookie = `chatshow=true; path=/`;
  };

  const handleCloseModal = () => {
    document.cookie = "chatshow=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setShowModal(false);
  };

  return (
    <div>
      <button className="help-button" onClick={handleShowModal}>
        <FontAwesomeIcon icon={faQuestionCircle} className="help-icon" />
      </button>

      <CustomModal show={showModal} handleClose={handleCloseModal} title="Fractals Chatbot">
        <p>...</p>
      </CustomModal>
    </div>
  );
};

export default HelpButtonWithModal;
