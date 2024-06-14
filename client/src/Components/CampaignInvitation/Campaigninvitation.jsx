import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header/Header";

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
        console.log(username);
        console.log(userCampaigns);
        const lastCampaign = userCampaigns[0];
        console.log(lastCampaign);
        setUserName(lastCampaign);
        document.cookie = `CampaignId=${userCampaigns[0].id}; path=/`;
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <>
      <Header />
      <div className="container page-container">
        <h4 style={{fontWeight:'700'}}>Campaign Invitation</h4>
        <p className="mt-4">
          You've been invited by <span className="highlighted">{userName.createdBy}</span> to join a secure data platform.
        </p>
        <p>
          <strong>Campaign ID: </strong>
          <span className="highlighted">{userName.id}</span>
        </p>
        <p>
          <strong>Name: </strong> CO2 emission calculation for
          <span className="highlighted">
            {" "}
            {userName.productBaseUnitGTIN}, {userName.productCaseGTIN}, {userName.productPalletGTIN} - {userName.productName}
          </span>
        </p>
        <p>
          <strong>Selected Frameworks: </strong> CO2 emission calculation for
          <span className="highlighted"> {userName.calculationFramework}</span>
        </p>

        <div className="row below-section">
          <div className="col-12 col-lg-3 d-flex justify-content-center align-items-center text-center p-2 page-btn" style={{width:'300px'}}>
            <div className="box btn w-100" onClick={() => goToPage("/review")}>
              Review Campaign
            </div>
          </div>
          <div className="col-12 col-lg-3 d-flex justify-content-center align-items-center text-center p-2 page-btn" style={{width:'300px'}}>
            <div className="box btn w-100" onClick={() => goToPage("/upload")}>
              Upload Data to Your Company Vault
            </div>
          </div>
          <div className="col-12 col-lg-3 d-flex justify-content-center align-items-center text-center p-2 page-btn" style={{width:'300px'}}>
            <div className="box btn w-100" onClick={() => goToPage("/share")}>
              Share Campaign with Suppliers
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionsScreen;
