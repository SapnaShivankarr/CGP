import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Select = () => {
  const navigate = useNavigate();
  const [manufacturerData, setManufacturerData] = useState(null);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, name: "Greenhouse Gas Protocol-Scope 3 CO2e", checked: false },
    { id: 2, name: "EUDR: Deforestation Verification", checked: false },
    { id: 3, name: "Labour Risks", checked: false },
  ]);
  const [errorcheck, setErrorCheck] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        setManufacturerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manufacturer data:", error);
      });
  }, []);

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) => prevCheckboxes.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox)));
  };

  const handleNext = (event) => {
    event.preventDefault();
    const selectedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
    if (selectedCheckboxes.length === 0) {
      setErrorCheck(true);
      setTimeout(() => {
        setErrorCheck(false);
      }, 2000);
    } else {
      navigate("/upload");
      console.log("Proceeding to the next step...");
    }
  };

  return (
    <>
    <Header />
    <div className="container page-container">
      <h4>Request for Audit</h4>
      <div className="row">
        <div className="col-md-6">
          <div className="container-fluid mt-5">
            <p>
              You've been invited by <span className="highlighted">Campaign Requester</span> to join a secure data platform.
            </p>
            <p>
              <strong>Campaign ID: </strong>
              <span className="highlighted">1025001</span>
            </p>
            <p>
              <strong>Name:</strong> CO2 emission calculation for <span className="highlighted">GTIN (of each) - Product Name</span>
            </p>
            <p>
              <strong>Selected Frameworks:</strong> CO2 emission calculation for <span className="highlighted">Product Carbon Footprint-GHGP (Scope 1-3)</span>
            </p>
            <div className="row below-section">
              <div className="col-12 col-lg-4 btn-border d-flex justify-content-center align-items-center text-center p-2">
                <div className="boxing" onClick={() => navigate("/audit")}>
                  Review Campaign for CO2 emission calculation
                </div>
              </div>
              <div className="col-12 col-lg-4 btn-border d-flex justify-content-center align-items-center text-center p-2">
                <div className="boxing" onClick={() => navigate("/audit")}>
                  Verify Deforestation Certification
                </div>
              </div>
              <div className="col-12 col-lg-4 btn-border d-flex justify-content-center align-items-center text-center p-2">
                <div className="boxing" onClick={() => navigate("/audit")}>
                  Validate Human Rights & Living Wages Compliance
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="setModuleHeight">
            <div className="bg-white p-4 rounded text-left">
              <p className="font-weight-bold mb-3">
                <b>Module</b>
                <span className="link-click-pst">imde.io</span>
              </p>
              <p className="font-weight-bold mb-3">
                <b>Output</b>
              </p>
              {errorcheck && <p className="warn-red">You need to select any one of the options</p>}
              {checkboxes.map((checkbox) => (
                <div key={checkbox.id} className="d-flex justify-content-between form-check mb-3">
                  <label className="form-check-label" htmlFor={`checkbox-${checkbox.id}`}>
                    {checkbox.name}
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={checkbox.checked}
                    onChange={() => handleCheckboxChange(checkbox.id)}
                    id={`checkbox-${checkbox.id}`}
                  />
                </div>
              ))}
              {manufacturerData && (
                <div className="mt-4 mb-4 text-center">
                  <img src="https://img.freepik.com/free-photo/tomato-saup-with-basil-bowl_114579-11606.jpg?w=300" alt="Manufacturer Logo" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
  );
};

export default Select;
