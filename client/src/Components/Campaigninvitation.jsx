import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Top from "./Top";

const ActionsScreen = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    const username = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("username="))
      .split("=")[1];
    try {
      const response = await axios.get(`https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/campaign-file-service/api/v1/campaign/all/${username}`);
      if (response.status === 200) {
        const userCampaigns = response.data.responseData.filter((option) => option.assignedTo === username);
        const lastCampaign = userCampaigns[userCampaigns.length - 1];
        setUserName(lastCampaign);
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="bgcolor vh-100">
      <Top />
      <div className="d-flex justify-content-center align-items-center">
        <div className="shadow-lg secondary-color ">
          <div className="mb-4">
            <h4>Campaign Invitation</h4>
            <p>
              You've been invited by <span className="highlighted">{userName.createdBy}</span> to join a secure data platform.
            </p>
            <p>
              <strong>Campaign ID : </strong>
              <span className="highlighted">{userName.id}</span>
            </p>
            <p>
              <strong>Name : </strong> CO2 emission calculation for
              <span className="highlighted">
                {" "}
                {userName.productBaseUnitGTIN},{userName.productCaseGTIN},{userName.productPalletGTIN}-{userName.productName}
              </span>
            </p>
            <p>
              <strong>Selected Frameworks :</strong> CO2 emission calculation for
              <span className="highlighted"> {userName.calculationFramework}</span>
            </p>
          </div>
          <div className="row below-section">
            <div className="col-12 col-lg-3 btn-border d-flex justify-content-center align-items-center text-center p-2">
              <div className="box" onClick={() => goToPage("/review")}>
                Review Campaign
              </div>
            </div>
            <div className="col-12 col-lg-3 btn-border d-flex justify-content-center align-items-center text-center p-2">
              <div className="box" onClick={() => goToPage("/upload")}>
                Upload Data to Your Company Vault
              </div>
            </div>
            <div className="col-12 col-lg-3 btn-border d-flex justify-content-center align-items-center text-center p-2">
              <div className="box" onClick={() => goToPage("/share")}>
                Share Campaign with Suppliers
              </div>
            </div>
          </div>
          {/* <div className="w-100 d-flex justify-content-end">
                    <button className="btn btn-primary mt-3 sharebtn" onClick={()=>goToPage('/review')}>Next</button>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default ActionsScreen;
