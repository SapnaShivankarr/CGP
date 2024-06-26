import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Top from "./Top";

const GeminiResponse = () => {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});
  const [finaldata, setFinalData] = useState({});
  const [falsecount, setFalseCount] = useState(0);
  const [presentdata, setPresentData] = useState({});
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const gcsCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("eventgcspath="));

        const gcsget = gcsCookie ? gcsCookie.split("=")[1] : undefined;

        const gcsCookieBOM = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("bomgcspath="));

        const gcsgetBOM = gcsCookieBOM ? gcsCookieBOM.split("=")[1] : undefined;

        const currentUserType = determineUserType();
        setUserType(currentUserType);
        let response;
        if (currentUserType === "manufacturer") {
          if (gcsgetBOM) {
            response = await axios.post("https://mfgvalidate-2adxlhbybq-ez.a.run.app/bom", { bomgcspath: gcsgetBOM });
          } else if (gcsget) {
            response = await axios.post("https://mfgvalidate-2adxlhbybq-ez.a.run.app/event", { eventgcspath: gcsget });
          }
        } else if (currentUserType === "retailer") {
          console.log(gcsget);
          response = await axios.post("https://retail-eventfile-validation-upmijlzbna-ez.a.run.app/", { eventgcspath: gcsget });
          console.log(response);
        }

        if (response.status === 200) {
          console.log("API Response Data:", response.data);

          // Split the response data by newline character to get individual JSON strings
          const jsonStrings = response.data.trim().split("\n");
          console.log("JSON Strings:", jsonStrings);

          // Parse each JSON string separately
          const dataObjects = jsonStrings.map((jsonString) => JSON.parse(jsonString));
          console.log("Data Objects:", dataObjects);

          const result = {};
          const present = {};
          let falseCount = 0;

          // Process each parsed object
          dataObjects.forEach((dataObject) => {
            const { ID, Missing_Value } = dataObject;
            if (Missing_Value === true) {
              result[ID] = "not present";
              falseCount++;
            } else if (Missing_Value === false) {
              present[ID] = "present";
            }
          });

          console.log("Final Data:", result);
          console.log("Present Data:", present);

          setPresentData(present);
          setFinalData(result);
          setFalseCount(falseCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDate();
  }, []);

  const determineUserType = () => {
    const getCookieValue = (name) => {
      const cookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith(`${name}=`));
      return cookie ? cookie.split("=")[1] : "";
    };

    const userType = getCookieValue("usertype");

    return userType.toLowerCase() === "retailer" ? "retailer" : "manufacturer";
  };
  const isBOMFile = (filename) => {
    return filename.toLowerCase().includes("bom");
  };
  const isEventFile = (filename) => {
    return filename.toLowerCase().includes("event");
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    navigate("/upload");
    setInitialData({});
    setFinalData({});
    setFalseCount(0);
  };

  return (
    <div className="bgcolor">
      <Top />
      <div className="d-flex justify-content-center align-items-center">
        <div className="shadow-lg secondary-color" style={{ position: "relative" }}>
          <div className="row">
            <div className="col-12 custom-calculated-results" style={{ marginBottom: "4rem" }}>
              <div className="gemini-container" style={{ border: "12px double gray", borderRadius: "10px", padding: "20px" }}>
                <div className="gemini-header">
                  <span className="gemini-logo">
                    <h4>Gemini</h4>
                  </span>
                </div>
                <div className="gemini-content">
                  {falsecount === 0 ? (
                    <>
                      {Object.keys(presentdata).length !== 0 ? (
                        <>
                          <p>
                            <b>Your Data looks good. Click on Next</b>
                          </p>
                          <ul>
                            {Object.keys(presentdata).map((key) => (
                              <li key={key}>{key}</li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p>Please wait</p>
                      )}
                    </>
                  ) : (
                    <>
                      <p>
                        <b>Sorry, your Data Uploaded does not contain the below fields. Please re-upload your file.</b>
                      </p>
                      <ul>
                        {Object.keys(finaldata).map((key) => (
                          <li key={key}>{key}</li>
                        ))}
                      </ul>
                      <p>
                        <b>Below is the Data Available in the document:</b>
                      </p>
                      <ul>
                        {Object.keys(presentdata).map((key) => (
                          <li key={key}>{key}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* <div className="gemini-reply">
                  <div className="input-container" style={{ visibility: "hidden" }}>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          handleUserMessage(event.target.value);
                          event.target.value = "";
                        }
                      }}
                    />
                    <div className="upload-container">
                      <label htmlFor="file-upload" className="upload-button">
                        <FontAwesomeIcon icon={faFileUpload} />
                      </label>
                      <input
                        type="file"
                        accept=".xml, .xls, .xlsx"
                        id="file-upload"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const file = event.target.files[0];
                          handleUserMessage({ type: "file", file });
                        }}
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="page-btn">
              {falsecount === 0 ? (
                <button className="btn fractals-btn btn-lg w-100 mb-3" onClick={() => navigate("/share")}>
                  Next
                </button>
              ) : (
                <button className="btn fractals-btn btn-lg w-100 mb-3" onClick={handleOnClick}>
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiResponse;
