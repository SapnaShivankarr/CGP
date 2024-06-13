import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const Share = () => {
  const navigate = useNavigate();
  const [campaignRequestCheckboxes, setCampaignRequestCheckboxes] = useState([
    { id: 20389755, name: "Ahold Delhaize", parameters: "Scope 3,EUDR", checked: true },
    { id: 30877756, name: "Spar", parameters: "Scope 3", checked: true },
  ]);
  const [alcal, setAlCal] = useState(true);
  const [shmarketplace, setShMarketPlace] = useState(true);
  const [CampaignInfo, setCampaign] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const getId = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("CampaignId="));
      const getfinalId = getId ? getId.split("=")[1] : undefined;

      const response = await axios.get(`http://localhost:9001/campaign-file-service/api/v1/campaign/${getfinalId}`);

      setCampaign(response.data.responseData);
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    setCampaignRequestCheckboxes((prevCheckboxes) => prevCheckboxes.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox)));
    let zx = campaignRequestCheckboxes;
    console.log(zx);
  };

  const handleCheckboxCal = (ini) => {
    setAlCal(!ini);
  };

  const handleCheckboxshmp = (ini) => {
    setShMarketPlace(!ini);
  };

  return (
    <>
    <Header />
    <div className="container page-container">
      <h4>Share calculated data</h4>
      <p className="font-weight-bold mb-3">Choose where to share data</p>
      <div className="row">
        <div className="col-md-4">
          <div className="bg-white p-4 mb-3 rounded text-left">
            <div className="mt-4 mb-4">
              <img src={`data:image/jpg;base64,${CampaignInfo.imageData}`} alt="Manufacturer Logo" className="img-fluid" />
              <p className="mt-2">
                <b>Campaign ID:</b> {CampaignInfo.id}
              </p>
              <p className="mt-2">
                <b>Product:</b> {CampaignInfo.productName}
              </p>
              <p>Results</p>
              <p className="mt-2">
                <b>5.03kg CO2e/kg</b> (GHCP)
              </p>
              <p>
                Supply Chain <a href="https://google.com">Map</a>
              </p>
              <a href="https://google.com">Auditor Attestation</a>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="setModule">
            <div className="bg-white p-4 rounded text-left">
              <p className="font-weight-bold mb-3 linkclick">
                <b>Company Data Vault</b>
              </p>
              <p className="font-weight-bold mb-3 mx-4">
                Zwanenberg_Fractals<span className="urlcheck">url:19xcf.fractals</span>
              </p>
              <div className="d-flex justify-content-between mx-4 mb-3">
                <label htmlFor="alcd">Allow others to calculate on this data?</label>
                <input className="form-check-input" type="checkbox" checked={alcal} onChange={() => handleCheckboxCal(alcal)} id="alcd" />
              </div>

              <p className="font-weight-bold mb-1 linkclick">
                <b>External</b>
              </p>
              <p className="font-weight-bold mb-3 mx-4">
                Campaign Requests
                <ul>
                  {campaignRequestCheckboxes.map((checkbox) => (
                    <li key={checkbox.id}>
                      <div className="d-flex justify-content-between mb-3 ml-0">
                        <label className="form-check-label" htmlFor={`checkbox-${checkbox.id}`}>
                          ID: <b>{checkbox.id}</b> {checkbox.name} {checkbox.parameters}
                        </label>
                        <input className="form-check-input" type="checkbox" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox.id)} id={`checkbox-${checkbox.id}`} />
                      </div>
                    </li>
                  ))}
                </ul>
              </p>
              <p className="font-weight-bold mb-3 linkclickpd mx-3">
                <b>Product Data Marketplace</b>
              </p>
              <div className="d-flex justify-content-between mx-4">
                <label htmlFor="shmp">Allow others to calculate on this data?</label>
                <input className="form-check-input" type="checkbox" checked={shmarketplace} onChange={() => handleCheckboxshmp(shmarketplace)} id="shmp" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="back-btn">
        <button className="btn fractals-btn btn-lg w-100 mt-4" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
        </>
  );
};

export default Share;
