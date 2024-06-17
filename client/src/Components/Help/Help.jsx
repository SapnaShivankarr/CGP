import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./HelpButtonWithModal.css";
import CustomModal from "../Chatbot/CustomModal";

const HelpButtonWithModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
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
