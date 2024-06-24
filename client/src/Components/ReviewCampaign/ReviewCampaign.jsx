import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";

function Upload() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [lazy, setLazy] = useState(true);

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    const userId = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("CampaignId="))
      .split("=")[1];
    try {
      const response = await axios.get(`https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/campaign-file-service/api/v1/campaign/${userId}`);
      if (response.status === 200) {
        setLazy(false);
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

  if (lazy) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  return (
    <div className="no-scroll">
      <Header />
      <div className="container page-container">
        <h4 style={{ fontWeight: "700" }}>Campaign Review</h4>
        <div className="row mt-4">
          <div className="detailsinvite col-md-4 col-12">
            <div style={{ width: "250px", height: "auto" }}>{userName?.imageData && <img style={{ width: "100%", height: "100" }} src={`data:image/jpeg;base64,${userName.imageData}`} className="invite" alt="Campaign Invitation" />}</div>
          </div>
          <div className="details setModuleheight col-md-8 col-12">
            <h5 style={{ fontWeight: "700" }} className="mb-2">
              {userName.productName || "Loading..."}
            </h5>
            <p className="my-1">
              <span>Campaign id - </span> {userName.id || "Loading..."}
            </p>
            <p className="detailpara">
              <span>Selected campaign - </span> {userName.campaignTypes || "Loading..."}
            </p>
            <p>
              <span>Product base unit GTIN - </span> {userName.productBaseUnitGTIN || "Loading..."}
            </p>
            <p>
              <span>Product case GTIN - </span> {userName.productCaseGTIN || "Loading..."}
            </p>
            <p>
              <span>Product pallet GTIN - </span> {userName.productPalletGTIN || "Loading..."}
            </p>
            <p>
              <span>Product name - </span> {userName.productName || "Loading..."}
            </p>
            <p>
              <span>Calculation framework - </span> {userName.calculationFramework || "Loading..."}
            </p>
            <p>
              <span>Auditor - </span> {userName.auditor || "Loading..."}
            </p>
            <p>
              <span>Selected products - </span> {userName.productName || "Loading..."}
            </p>
            <p>
              <span>Selected frameworks - </span> {userName.calculationFramework || "Loading..."}
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
  );
}

export default Upload;
