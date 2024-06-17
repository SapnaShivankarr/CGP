import React from "react";
import "./Loading.css"; // Import the CSS file for styling

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="dot-spinner">
        <div className="dot1"></div>
        <div className="dot2"></div>
        <div className="dot3"></div>
      </div>
      <h2>Fractals</h2>
    </div>
  );
};

export default Loading;
