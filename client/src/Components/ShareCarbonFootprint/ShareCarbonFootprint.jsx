import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Share = () => {
  const navigate = useNavigate();
  const [campaignRequestCheckboxes, setCampaignRequestCheckboxes] = useState([
    { id: 20389755, name: "Ahold Delhaize", parameters: "Scope 3,EUDR", checked: true },
    { id: 30877756, name: "Spar", parameters: "Scope 3", checked: true },
  ]);
  const [alcal, setAlCal] = useState(true);
  const [shmarketplace, setShMarketPlace] = useState(true);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [lazy, setLazy] = useState(true);
  const [emissionResult, setEmissionResult] = useState(0);
  const defaultImage = "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=140&t=st=1718346796~exp=1718347396~hmac=e939e86149aef1f72f928bfd38f79f4d975bf060c59c6f5270579613219daa93";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getId = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("CampaignId="));
        const getfinalId = getId ? getId.split("=")[1] : undefined;

        if (!getfinalId) {
          throw new Error("CampaignId cookie is not found or invalid.");
        }

        const response = await axios.get(`https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/campaign-file-service/api/v1/campaign/${getfinalId}`);
        const usertype = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("usertype="));
        const usertypeValue = usertype ? usertype.split("=")[1] : "";

        if (usertypeValue.toLowerCase() === "manufacturer") {
          const response1 = await axios.get(`http://localhost:9001/event-service/api/v1/event/manufacturer/${getfinalId}`);
          // const response2 = await axios.get(`http://localhost:9001/event-service/api/v1/bom/manufacturer/${getfinalId}`);
          if (response1.status === 200) {
            const responseData = response1.data?.responseData;
            const firstResponseData = responseData?.[0];
            const secondResponseData = responseData?.[1];
            const lastEvent = firstResponseData?.componentusecategory === "Product" ? firstResponseData?.lcaindicatorvalue : "";
            const lastBOM = secondResponseData?.componentusecategory === "Packaging" ? secondResponseData?.lcaindicatorvalue : "";
            console.log(lastEvent);
            console.log(lastBOM);
            console.log(parseFloat(lastEvent) + parseFloat(lastBOM));
            setEmissionResult(parseFloat((parseFloat(lastEvent) + parseFloat(lastBOM)).toFixed(3)));
          }
        } else {
          const response3 = await axios.get(`http://localhost:9001/event-service/api/v1/event/retailer/${getfinalId}`);
          if (response3.status === 200) {
            const responseData = response3.data?.responseData;
            const firstResponseData = responseData?.[0];
            const lastEvent = firstResponseData?.lcaindicatorvalue;
            console.log(parseInt(lastEvent));
            setEmissionResult(lastEvent);
          }
        }

        if (response.status === 200) {
          setCampaignInfo(response.data.responseData);
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      } finally {
        setLazy(false);
      }
    };
    fetchData();
  }, [emissionResult]);

  const handleCheckboxChange = (id) => {
    setCampaignRequestCheckboxes((prevCheckboxes) => prevCheckboxes.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox)));
  };

  const handleCheckboxCal = () => {
    setAlCal((prev) => !prev);
  };

  const handleCheckboxshmp = () => {
    setShMarketPlace((prev) => !prev);
  };

  if (lazy) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container page-container">
        <h4 style={{ fontWeight: "700" }}>Share calculated data</h4>
        <p className="font-weight-bold mb-3">Choose where to share data</p>
        <div className="row">
          <div className="col-md-4">
            <div className="bg-white mb-3 rounded text-left">
              <div className="mb-4 p-2">
                <img src={campaignInfo && campaignInfo.imageData ? `data:image/jpg;base64,${campaignInfo.imageData}` : defaultImage} alt="Manufacturer Logo" style={{ width: "200px" }} className="mb-3" />
                <p className="mt-2">
                  <b>Campaign ID:</b> {campaignInfo ? `${campaignInfo.id}` : "Default Id"}
                </p>
                <p className="mt-2">
                  <b>Product:</b> {campaignInfo ? `${campaignInfo.productName}` : "Default Id"}
                </p>
                <p>Results</p>
                <p className="mt-2">
                  <b>{emissionResult ? emissionResult : ""} kg CO2e/kg</b> (GHCP)
                </p>
                <p>
                  Supply Chain <a href="https://google.com"> Map</a>
                </p>
                <a href="https://google.com">Auditor Attestation </a>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="setModule setModuleheight">
              <div className="bg-white p-4 rounded text-left">
                <p className="font-weight-bold mb-3 linkclick">
                  <b>Company Data Vault</b>
                </p>
                <p className="font-weight-bold mb-3 mx-4">
                  Zwanenberg_Fractals<span className="urlcheck">url:19xcf.fractals</span>
                </p>
                <div className="d-flex justify-content-between mx-4 mb-3">
                  <label htmlFor="alcd">Allow others to calculate on this data?</label>
                  <input className="form-check-input" type="checkbox" checked={alcal} onChange={handleCheckboxCal} id="alcd" />
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
                  <input className="form-check-input" type="checkbox" checked={shmarketplace} onChange={handleCheckboxshmp} id="shmp" />
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
