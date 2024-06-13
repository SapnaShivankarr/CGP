import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";

function Upload() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    const userId = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("CampaignId="))
      .split("=")[1];
    try {
      const response = await axios.get(`http://localhost:9001/campaign-file-service/api/v1/campaign/${userId}`);
      if (response.status === 200) {
        setUserName(response.data.responseData);
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
    <>
    <Header />
    <div className="container page-container">
      <h4 className="mb-4">Campaign Review</h4>
      <div className="row mt-4">
        <div className="detailsinvite col-4">
          <div style={{ width: "250px", height: "auto" }}>
            {userName?.imageData && (
              <img
                style={{ width: "100%", height: "100%" }}
                src={`data:image/jpeg;base64,${userName.imageData}`}
                className="invite"
                alt="Campaign Invitation"
              />
            )}
          </div>
        </div>
        <div className="details col-8">
          <h5 className="mb-2">{userName.productName || "Loading..."}</h5>
          <p className="my-1">
            <b>Campaign ID - </b> {userName.id || "Loading..."}
          </p>
          <p className="detailpara">
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
            <b>Selected Frameworks - </b> {userName.calculationFramework || "Loading..."}
          </p>
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
}

export default Upload;
