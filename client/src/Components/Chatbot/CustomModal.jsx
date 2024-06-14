import React from "react";
import "./CustomModal.css";

const CustomModal = ({ show, handleClose, title, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h5 style={{ color: "black" }}>{title}</h5>
          <button type="button" className="close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <iframe src="https://chatui-k5atvf3ecq-ez.a.run.app/" title="Chatbot" width="100%" height="400px"></iframe>
        </div>
        <div className="custom-modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
