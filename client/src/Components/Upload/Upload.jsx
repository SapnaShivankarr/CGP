import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const UploadDataScreen = () => {
  const navigate = useNavigate();
  const [eventFile, setEventFile] = useState(null);
  const [bomFile, setBomFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [RetailerUser, setRetailerUser] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userBucketPath, setUserBucketPath] = useState("");
  const [encryptdBucketPath, setEncryptdBucketPath] = useState("");
  const [finalResultBucketPath, setFinalResultBucketPath] = useState("");
  const [active, setActive] = useState(true);
  const [eventUser, setEventUser] = useState(false);
  const [campaignIdEntered, setCampaignIdEntered] = useState("");

  useEffect(() => {
    const getCookieValue = (name) => {
      const cookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith(`${name}=`));
      return cookie ? cookie.split("=")[1] : "";
    };

    const usertype = getCookieValue("usertype");
    setUserType(usertype);
    const campaignid = getCookieValue("CampaignId");
    setCampaignIdEntered(campaignid);
    if (usertype.toLowerCase() === "retailer") {
      setRetailerUser(true);
    }
    if (usertype.toLowerCase() === "manufacturer" && getCookieValue("manufactureevent")) {
      setEventUser(true);
    }
    if (usertype.toLowerCase() === "manufacturer" && getCookieValue("manufacturebom")) {
      setRetailerUser(true);
    }

    setUserName(getCookieValue("userName"));
    setUserBucketPath(getCookieValue("userBucketPath"));
    setEncryptdBucketPath(getCookieValue("encryptdBucketPath"));
    setFinalResultBucketPath(getCookieValue("finalResultBucketPath"));
    setActive(true);
  }, [eventFile, bomFile, pdfFile]);

  const handleUpload = async () => {
    if (!eventFile && !bomFile && !pdfFile) {
      setErrorMessage("Please select at least one file to upload.");
      setSuccessMessage("");
      window.alert("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();
    const loginResponseDTO = JSON.stringify({
      userName,
      userType,
      userBucketPath,
      encryptdBucketPath,
      finalResultBucketPath,
      active,
    });

    formData.append("loginResponseDTO", loginResponseDTO);

    try {
      if (userType.toLowerCase() === "manufacturer") {
        if (bomFile) {
          formData.append("file", bomFile);
          const response = await axios.post("https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/file-services/api/v1/upload/mfg/bom/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            setSuccessMessage("BOM file uploaded successfully!");
            setErrorMessage("");
            const filecookie = bomFile.name;
            document.cookie = `bomgcspath=gs://mfg_bom/${filecookie}; path=/`;
            document.cookie = `fileUrl=${response.data.responseData.fileUrl}; path=/`;
            document.cookie = `fileName=${response.data.responseData.fileName}; path=/`;
            document.cookie = "eventgcspath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          } else {
            throw new Error("Failed to upload BOM file");
          }
        } else if (eventFile) {
          formData.append("file", eventFile);
          const response = await axios.post("https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/file-services/api/v1/upload/mfg/event/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            setSuccessMessage("Event file uploaded successfully!");
            setErrorMessage("");
            const filecookie = eventFile.name;
            document.cookie = `eventgcspath=gs://mfg_event/${filecookie}; path=/`;
            document.cookie = `fileUrl=${response.data.responseData.fileUrl}; path=/`;
            document.cookie = `fileName=${response.data.responseData.fileName}; path=/`;
            document.cookie = "bomgcspath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          } else {
            throw new Error("Failed to upload event file");
          }
        }
      }

      if (userType.toLowerCase() === "retailer") {
        if (eventFile) {
          formData.append("file", eventFile);
          const response = await axios.post("https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/file-services/api/v1/upload/retailer/event/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            setSuccessMessage("File uploaded successfully!");
            setErrorMessage("");
            const filecookie = eventFile.name;
            document.cookie = `eventgcspath=gs://reatiler_event/${filecookie}; path=/`;
            document.cookie = `fileUrl=${response.data.responseData.fileUrl}; path=/`;
            document.cookie = `fileName=${response.data.responseData.fileName}; path=/`;
            document.cookie = "bomgcspath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          } else {
            throw new Error("Failed to upload PDF file");
          }
        }
      }

      window.alert("Files uploaded successfully!");
      sessionStorage.removeItem("GeminiPresentInfo");
      sessionStorage.removeItem("GeminiResponseAbsent");
      sessionStorage.removeItem("FalseCount");
      navigate("/response");
    } catch (error) {
      console.error("Error uploading files:", error);
      setErrorMessage("Error uploading files. Please try again.");
      setSuccessMessage("");
      window.alert("Error uploading files. Please try again.");
    }
  };

  const removeFile = (type, e) => {
    e.preventDefault();
    switch (type) {
      case "event":
        setEventFile(null);
        break;
      case "bom":
        setBomFile(null);
        break;
      case "pdf":
        setPdfFile(null);
        break;
      default:
        break;
    }
  };

  const displayFileName = (file, type) => {
    return (
      <div>
        {file && (
          <div>
            <span>
              {type.toUpperCase()}-{file.name}
            </span>
            <FontAwesomeIcon icon={faTimes} className="ml-2 text-danger" style={{ cursor: "pointer" }} onClick={(e) => removeFile(type, e)} />
          </div>
        )}
      </div>
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile) {
      window.alert("No file dropped.");
      return;
    }

    if (type === "bom") {
      setBomFile(droppedFile);
    } else if (type === "event") {
      setEventFile(droppedFile);
    } else {
      setPdfFile(droppedFile);
    }
  };

  return (
    <div className="no-scroll">
      <Header />

      <div className={`container page-container ${isDragging ? "dragging" : ""}`}>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <h4 style={{ fontWeight: "700" }} className="mb-4">Upload data to your company vault</h4>
              {/* <p>Data types</p> */}
              {userType.toLowerCase() === "manufacturer" && <p>You have to upload both BOM and Event File</p>}
              <span>
                Your CampaignId Id is <b>{campaignIdEntered}</b>.Please Upload your xml files with the Correct CampaignId
              </span>
              <div><span>You can either click & select or drag and drop your document one by one</span></div>
            </div>

            <div className="row below-section">
              <div className={`col-12 col-lg-3 d-flex justify-content-center align-items-center text-center p-2 ${isDragging ? "dragging" : ""}`} onDrop={(e) => handleDrop(e, "bom")} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
                <div className={RetailerUser ? "boxpit" : "box"}>
                  <label className={`file-label ${RetailerUser ? "disable-btn-border" : "btn-border"}`}>
                    Distributed Bill of Materials (BOM)
                    <input type="file" accept=".xml" onChange={(e) => setBomFile(e.target.files[0])} style={{ display: "none" }} disabled={RetailerUser} />
                    <div className="p-1 mt-1" style={{ backgroundColor: RetailerUser ? "gray" : "lightgreen" }}>
                      <FontAwesomeIcon icon={faFileUpload} size="2x" />
                    </div>
                  </label>
                </div>
              </div>

              <div className={`col-12 col-lg-3 d-flex justify-content-center align-items-center text-center p-2 ${isDragging ? "dragging" : ""}`} onDrop={(e) => handleDrop(e, "event")} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
                <div className={eventUser ? "boxpit" : "box"}>
                  <label className={`file-label ${eventUser ? "disable-btn-border" : "btn-border"}`}>
                    Own Events Emission
                    <input type="file" accept=".xml" onChange={(e) => setEventFile(e.target.files[0])} style={{ display: "none" }} disabled={eventUser} />
                    <div className="p-1 mt-4" style={{ backgroundColor: eventUser ? "gray" : "lightgreen" }}>
                      <FontAwesomeIcon icon={faFileUpload} size="2x" />
                    </div>
                  </label>
                </div>
              </div>

              <div className={`col-12 col-lg-3 d-flex justify-content-center align-items-center text-center p-2 ${isDragging ? "dragging" : ""}`} onDrop={(e) => handleDrop(e, "pdf")} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
                <div className="box">
                  <label className="file-label disable-btn-border">
                    Others
                    <input type="file" accept=".xml" onChange={(e) => setEventFile(e.target.files[0])} style={{ display: "none" }} disabled />
                    <div className="p-1 mt-4" style={{ backgroundColor: "gray" }}>
                      <FontAwesomeIcon icon={faFileUpload} size="2x" />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="row my-4">
              <div className="col-md-12">
                {displayFileName(bomFile, "bom")}
                {displayFileName(eventFile, "event")}
                {displayFileName(pdfFile, "pdf")}
              </div>
            </div>
            <div className="page-btn">
              <button className="btn me-2" onClick={handleUpload}>
                Upload
              </button>
            </div>
            <div className="row my-4">
              <div className="col-md-12 page-btn">
                <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDataScreen;
