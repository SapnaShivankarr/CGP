import React, { useEffect } from "react";
import "./CustomModal.css";

const CustomModal = ({ show, handleClose, title }) => {
  useEffect(() => {
    console.log(show);
    const chatshow = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("chatshow="));
    const chatvalue = chatshow ? chatshow.split("=")[1] : undefined;
    const shouldShow = chatvalue === "true" || show;
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className={`modal-overlay ${show ? "show" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <iframe src="https://chatui-k5atvf3ecq-ez.a.run.app/" title="Chatbot" width="100%" height="450px"></iframe>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
