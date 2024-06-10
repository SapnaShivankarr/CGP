import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Top from "./Top";

function Upload() {
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

  // const isLoggedIn = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("loggedIn="));
  // const loginname = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("username="));

  // if (isLoggedIn && isLoggedIn.split("=")[1] === "true") {
  //   setTitle(loginname.split("=")[1]);
  // }
  // console.log(loginname.split("=")[1]);

  return (
    <div className="bgcolor">
      <Top />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="shadow-lg secondary-color">
          <h4 className="mb-4">Campaign Review</h4>
          <div className="row mt-4">
            <div className="detailsinvite col-4">
              <div style={{ width: "250px", height: "auto" }}>
                <img style={{ width: "100%", height: "100%" }} src={`https://img.freepik.com/free-photo/tomato-saup-with-basil-bowl_114579-11606.jpg?t=st=1714728954~exp=1714732554~hmac=ed7fec1f51326b85d57fdfd87e91d11497cb5f70456dc5abd008c2ed50b1aa11&w=200`} className="invite" alt="Campaign Invitation" />
              </div>
            </div>

            <div className="details col-8">
              <h5 className="mb-2">{userName.productName || "Loading..."}</h5>
              <p className="my-1">
                <b>GTIN ID - </b> {userName.id || "Loading..."}
              </p>
              <p className="detailpara">
                <p className="mt-2">
                  <b>Selected Campaign - </b> {userName.campaignTypes || "Loading..."}
                </p>
                <p>
                  <b>Product Base Unit GTIN - </b> {userName.productBaseUnitGTIN || "Loading..."}
                </p>
                <p>
                  <b>Product Case GTIN - </b> {userName.productCaseGTIN || "Loading..."}
                </p>
                <p>
                  <b>Product Pallet GTIN - </b> {userName.productPalletGTIN || "Loading..."}
                </p>
                <p>
                  <b>Product Name - </b> {userName.productName || "Loading..."}
                </p>
                <p>
                  <b>Calculation Framework - </b> {userName.calculationFramework || "Loading..."}
                </p>
                <p>
                  <b>Auditor - </b> {userName.auditor || "Loading..."}
                </p>
                <p>
                  <b>Selected Products - </b> {userName.productName || "Loading..."}
                </p>
                <p>
                  <b>Selected Frameworks - </b>
                  {userName.calculationFramework || " Loading..."}
                </p>
              </p>
            </div>
          </div>
          <div className="back-btn">
            <button className="btn fractals-btn btn-lg w-100 mt-4" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
