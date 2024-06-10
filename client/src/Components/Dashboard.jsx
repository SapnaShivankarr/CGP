import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { NavLink, useNavigate } from "react-router-dom";
import Top from "./Top";

const DashBoard = () => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="dashboard-container">
      <Top/>
      <div className="container-fluid mt-4 dashboard-bg">
        <div className="d-inline-block heading side-nav">
          <h4>Dashboard</h4>
          <br />
          <NavLink to="/suppliers">Suppliers</NavLink>
          <br />
          <NavLink>Campaigns</NavLink>
          <br />
          <NavLink>Calculations</NavLink>
          <br />
          <NavLink>Jobs</NavLink>
          <br />
          <NavLink>
            Scope-3
            <div className="currcamp">
              <hr />
              <p>Coffee-Ahold Delhaize</p>
              <hr />
            </div>
          </NavLink>
          <br />
          <NavLink>Our Results</NavLink>
          <br />
          <NavLink>Community</NavLink>
          <br />
          <NavLink>Marketplace</NavLink>
          <br />
          <NavLink>Product Catalogue</NavLink>
        </div>
        <div className="heading main-content">
          <h5>Progress: Scope 3 Calculation - Ahold Delhaize</h5>
          <br />
          <h6>Campaign ID : 1200501</h6>
          <div>
            <div className="bg-white p-3 mb-3 rounded-3 text-left">
              <h6>Status: IN PROGRESS</h6>
              <div className="dataup row p-3 mb-3 rounded-1 text-left">
                <div className="col-md-3">
                  <p className="statusgray">Data Uploaded:</p>
                  <p className="statusgray">Supplier Invitations:</p>
                  <p className="statusgray">Results:</p>
                </div>
                <div className="col-md-3">
                  <p className="statusgray">File(1),File(2)</p>
                  <p className="statusgray">Columbia Beans</p>
                  <p className="statusgray">Pending</p>
                </div>
              </div>
              <h6>Supply Chain Members</h6>
              <div className="dataup row p-3 mb-3 rounded-1 text-left">
                <div className="col-md-2">
                  <div className="triangle"></div>
                  <h6>Ahold Delhaize</h6>
                </div>
                <div className="col-md-2">
                  <div className="triangle1"></div>
                  <h6>Shippers Ltd.</h6>
                  <p>Complete</p>
                </div>
                <div className="col-md-2">
                  <div className="triangle1"></div>
                  <h6>Our Company</h6>
                  <p>Waiting</p>
                </div>
                <div className="col-md-2">
                  <div className="triangle2"></div>
                  <h6>Columbia Beans</h6>
                  <p>Accepted</p>
                </div>
                <div className="col-md-2">
                  <div className="triangle2"></div>
                  <h6>Columbia Beans</h6>
                  <p>Accepted</p>
                </div>
                <div className="col-md-2">
                  <div className="triangle3"></div>
                  <h6>Columbia Beans</h6>
                  <p>Accepted</p>
                </div>
              </div>
              <h6>Results:</h6>
              <div className="dataup row p-3 mb-3 rounded-1 text-left">
                <div>
                  Allocated company emissions for <b>Ahold Delhaize</b>, March 24, 2024
                  <div id="resultretailer">6.255tCO2e</div>
                </div>
              </div>
              <div className="button-container">
                <button className="shans" onClick={() => navigate('/share')}>Share Answer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
