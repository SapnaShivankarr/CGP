import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const ReviewsHeader = () => {
  const navigate=useNavigate();
  const [includeTransportation, setIncludeTransportation] = useState(false);
  const [includeLocationData, setIncludeLocationData] = useState(false);
  const [includeCompanyName, setIncludeCompanyName] = useState(false);

  const handleAcknowledge=(e)=>{
    e.preventDefault();
    setIncludeTransportation(true);
    setIncludeLocationData(true);
    setIncludeCompanyName(true);
  }

  return (
    <div>
      <Header/>
      <div className="d-block mt-4 custom-container">
        
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <h3 className="mt-3">Review and Confirm</h3>
            <p className="font-weight-bold mb-3">Choose what others can do on your data</p>
          </div>
          <div className="row justify-content-start custom-row">
            <div className="col-10 custom-col">
              <div className="row">
                <div className="col custom-private-data">
                  Private Data Uploaded
                </div>
                <div className="custom-divider"></div>
                <div className="col-6 custom-additional-box">
                  {/* {BACKEND DATA} */}
                </div>
                <div className="col-4 custom-calculated-results">
                  <div className="custom-results-heading">Calculated Results</div>
                  <ul className="custom-results-list">
                    <li>CO2/e/kg in total</li>
                  </ul>
                  <div className="custom-expiration-date">
                    Expiration Date:
                    <div>01.08.24</div>
                  </div>
                  <p className="custom-help-text">Help others manage their supply chain visibility & traceability</p>
                  <div className="custom-include-section">
                    Include:
                    <ul className="custom-include-list">
                      <li>
                        <span>Transportation (from/to)</span>
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={includeTransportation}
                            onChange={() => setIncludeTransportation(!includeTransportation)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <span>Location Data (City/Port)</span>
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={includeLocationData}
                            onChange={() => setIncludeLocationData(!includeLocationData)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <span>Company Name</span>
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={includeCompanyName}
                            onChange={() => setIncludeCompanyName(!includeCompanyName)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                    </ul>


                  </div>
                  <div className="custom-acknowledge-btn">
                    <button className="btn btn-primary mt-1 acknowledgebtn" onClick={handleAcknowledge}>Acknowledge</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end custom-row">
          <button className="btn btn-primary mt-2 sharebtn" onClick={()=>navigate("/share")}>Next</button>
      </div>
      </div>
      </div>
  );
};

export default ReviewsHeader;
