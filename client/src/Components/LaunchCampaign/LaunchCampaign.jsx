import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./LaunchCampaign.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";

const LaunchCampaign = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  // const [selectMaterial, setSelectMaterial] = useState("");
  const [gpcoption, setGPCOption] = useState("");
  const [frameworkoption, setFrameworkoption] = useState("");
  const [supplieroption, setSupplierOption] = useState("");
  const [lcaoption, setLcaOption] = useState("");
  const [daplocationoption, setDAPLocationOptions] = useState("");
  const [baseunitGTIN, setBaseUnitGTIN] = useState("");
  const [caseunitGTIN, setCaseUnitGTIN] = useState("");
  const [palletunitGTIN, setPalletUnitGTIN] = useState("");
  const [productNameCampaign, setProductNameCampaign] = useState("");
  const [imagefile, setImageFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // State for image preview
  const [baseuniterr, setBaseUniterr] = useState(false);
  const [caseuniterr, setCaseUniterr] = useState(false);
  const [palletuniterr, setPalletUniterr] = useState(false);
  const [isUserPresent, setUserPresent] = useState(false);
  const [userData, setUserData] = useState(true);
  const [campaignString, setCampaignString] = useState("");
  const [lazy, setLazy] = useState(false);
  const [isopen, setOpen] = useState(false);

  const [campaignoptions, setCampaignOptions] = useState([
    { id: 1, name: "Product Carbon Footprint", checked: true },
    { id: 2, name: "EUDR: Deforestation Verification", checked: false },
    { id: 3, name: "Labour Risks", checked: false },
  ]);

  const [gpc, setGpc] = useState([{ id: 1, name: "(GLN) 08712345678906 – (Name) Zwanenberg​" }]);
  const [supplier, setSupplier] = useState([
    { id: 1, name: "Zwanenberg", gln: "123456789" },
    { id: 2, name: "Unilever", gln: "126576458" },
    { id: 3, name: "Procter & Gamble", gln: "978767689" },
    { id: 4, name: "Heineken", gln: "768776854" },
  ]);
  const [lcaTerm, setLCATerm] = useState([
    { id: 1, name: "EXW" },
    { id: 2, name: "DAP" },
    { id: 3, name: "CTS" },
    { id: 4, name: "CTU" },
    { id: 5, name: "CTE" },
    { id: 6, name: "CTG" },
  ]);
  const [dapLocations, setDapLocations] = useState([
    { id: 1, Country: "NL", City: "Amsterdam" },
    { id: 2, Country: "NL", City: "Delfgauw" },
    { id: 3, Country: "NL", City: "Zaandam" },
  ]);
  const [options, setOptions] = useState([
    { id: 1, name: "Product Carbon Footprint-GHGP" },
    { id: 2, name: "Material Carbon Footprint-GHGP" },
    { id: 3, name: "Component Carbon Footprint-GHGP" },
  ]);
  const [manufacturerData, setManufacturerData] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, name: "Greenhouse Gas Protocol-Scope 3 C02e", checked: true },
    { id: 2, name: "EUDR:Deforestation verification", checked: false },
    { id: 3, name: "Labour Risks", checked: false },
  ]);
  const [auditors, setAuditors] = useState(["Impact Buying"]);
  // const [materialoptions, setMaterialoptions] = useState(["Tomato Soup - Zwanenberg,500ml"]);
  const [selectCampaign, setSelectCampaign] = useState("");
  const [errorcheck, setErrorCheck] = useState(false);

  useEffect(() => {
    // Simulate fetching manufacturer data and image
    const getId = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("CampaignId="));

    const getIdforsearch = getId ? getId.split("=")[1] : undefined;

    const fetchDate = async () => {
      try {
        let response;
        if (getIdforsearch) {
          setLazy(true);
          response = await axios.get(`https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/campaign-file-service/api/v1/campaign/${getIdforsearch}`);

          if (response.status === 200) {
            setLazy(false);
            setUserPresent(true);
            console.log(response.data.responseData);
            setUserData(response.data.responseData);
            setCampaignString(response.data.responseData.campaignTypes);
            setImagePreviewUrl(`data:image/jpg;base64,${response.data.responseData.imageData}`);
            getCampaign(response.data.responseData.campaignTypes);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDate();
  }, []);

  const getCampaign = (campaignString) => {
    const datacampaign = campaignString.split(", ");
    console.log(datacampaign);

    const newCheckboxes = checkboxes.map((option) => {
      if (datacampaign.includes(option.name)) {
        return { ...option, checked: true };
      } else {
        return { ...option, checked: false };
      }
    });

    setCheckboxes(newCheckboxes);
    const newCampaignOptions = campaignoptions.map((op) => {
      const matchingCheckbox = newCheckboxes.find((opr) => opr.id === op.id);
      if (matchingCheckbox) {
        return { ...op, checked: matchingCheckbox.checked };
      }
      return op;
    });

    setCampaignOptions(newCampaignOptions);
  };

  const handleSelectFrameworks = (event) => {
    const x = event.target.value;
    setFrameworkoption(event.target.value);
    if (isUserPresent) {
      setUserData({
        ...userData,
        calculationFramework: event.target.value,
      });
    }
    console.log(x);
  };

  const handleSelectCampaign = (event) => {
    const selectedOptionId = parseInt(event.target.value);
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === selectedOptionId) {
        return { ...checkbox, checked: !checkbox.checked };
      } else {
        return { ...checkbox };
      }
    });
    setCheckboxes(updatedCheckboxes);
    const opt = campaignoptions.map((checkbox) => {
      if (checkbox.id === selectedOptionId) {
        return { ...checkbox, checked: !checkbox.checked };
      } else {
        return { ...checkbox };
      }
    });
    setCampaignOptions(opt);
  };

  // const handleSelectMaterial = (event) => {
  //   const z = event.target.value;
  //   setSelectMaterial(event.target.value);
  //   console.log(z);
  // };

  const handleSelectGPC = (event) => {
    const z = event.target.value;
    setGPCOption(event.target.value);
    if (isUserPresent) {
      setUserData({
        ...userData,
        globalProductClassification: event.target.value,
      });
    }
    console.log(z);
  };

  const handleSelectSupplier = (event) => {
    const z = event.target.value;
    setSupplierOption(event.target.value);
    if (isUserPresent) {
      setUserData({
        ...userData,
        productSupplier: event.target.value,
      });
    }
    console.log(z);
  };

  const handleSelectLCATerm = (event) => {
    const z = event.target.value;
    setLcaOption(event.target.value);
    if (isUserPresent) {
      setUserData({
        ...userData,
        lcaTerm: event.target.value,
      });
    }
    console.log(z);
  };

  const handleSelectLocation = (event) => {
    const z = event.target.value;
    setDAPLocationOptions(event.target.value);
    if (isUserPresent) {
      setUserData({
        ...userData,
        location: event.target.value,
      });
    }
    console.log(z);
  };
  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) => prevCheckboxes.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox)));
    setCampaignOptions((prevOptions) => prevOptions.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox)));
    let zx = checkboxes;
    console.log(zx);
  };

  const handleNext = async (event) => {
    event.preventDefault(); // Prevent form submission

    const selectedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
    let hasError = false;

    if (selectedCheckboxes.length === 0) {
      setErrorCheck(true);
      hasError = true;
    }

    if (baseunitGTIN.length !== 14) {
      setBaseUniterr(true);
      hasError = true;
    } else {
      setBaseUniterr(false);
    }

    if (caseunitGTIN.length !== 14) {
      setCaseUniterr(true);
      hasError = true;
    } else {
      setCaseUniterr(false);
    }

    if (palletunitGTIN.length !== 14 && palletunitGTIN.length !== 0) {
      setPalletUniterr(true);
      hasError = true;
    } else {
      setPalletUniterr(false);
    }

    // if (hasError) {
    //   setTimeout(() => {
    //     setErrorCheck(false);
    //     setBaseUniterr(false);
    //     setCaseUniterr(false);
    //     setPalletUniterr(false);
    //   }, 2000);
    //   return;
    // }

    if (!hasError) {
      setLazy(true);

      const strimp = selectedCheckboxes.map((option) => option.name).join(", ");

      const getCookie = (name) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        if (match) return match[2];
        return null;
      };

      const userName = getCookie("username");
      const userType = getCookie("usertype");
      const userBucketPath = getCookie("userbucketpath");
      const encryptedBucketPath = getCookie("encryptedbucketpath");
      const finalResultBucketPath = getCookie("finalresultbucketpath");
      const active = getCookie("active");

      const loginResponseDTO = {
        userName: userName,
        userType: userType,
        userBucketPath: userBucketPath,
        encryptdBucketPath: encryptedBucketPath,
        finalResultBucketPath: finalResultBucketPath,
        active: active,
      };

      const campaignFileRequestDTO = {
        campaignTypes: strimp,
        productBaseUnitGTIN: baseunitGTIN,
        productCaseGTIN: caseunitGTIN,
        productPalletGTIN: palletunitGTIN,
        productName: productNameCampaign,
        globalProductClassification: gpcoption,
        productSupplier: supplieroption,
        lcaTerm: lcaoption,
        location: daplocationoption,
        calculationFramework: frameworkoption,
        auditor: "Impact Buying",
        assignedTo: supplieroption,
      };
      console.log(loginResponseDTO);
      console.log(campaignFileRequestDTO);
      console.log(imagefile);

      const formData = new FormData();
      formData.append("file", imagefile);
      formData.append("campaignFileRequestDTO", new Blob([JSON.stringify(campaignFileRequestDTO)], { type: "application/json" }));
      formData.append("loginResponseDTO", new Blob([JSON.stringify(loginResponseDTO)], { type: "application/json" }));

      try {
        const response = await axios.post("https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/campaign-file-service/api/v1/campaign/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200) {
          console.log(response);
          document.cookie = `CampaignId=${response.data.responseData.id}; path=/`;
          const imageBase64 = encodeURIComponent(response.data.responseData.imageData);
          console.log(imageBase64);
          sessionStorage.setItem("uploadedImageData", imageBase64);
          navigate("/upload");
        }
      } catch (error) {
        console.error("Error submitting the form: ", error);
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const completeEdit = async (event) => {
    setLazy(true);
    event.preventDefault();
    const selectedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
    const strimp = selectedCheckboxes.map((option) => option.name).join(", ");
    const updatedUserData = { ...userData, campaignTypes: strimp || "" };

    try {
      console.log(updatedUserData);
      const response = await axios.put("https://cpg-backend-service-k5atvf3ecq-ez.a.run.app/campaign-file-service/api/v1/campaign/", updatedUserData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        navigate("/upload");
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
    }
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
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
      <div className="container page-container col-md-12">
        <form onSubmit={isUserPresent ? completeEdit : handleNext}>
          <div className="topmost campaign">
            <div className="row">
              <div className="col-md-6 pdr">
                <div className="d-flex flex-column justify-content-center">
                  <div className="adjust">
                    <span>Define your new data Campaign</span>
                    <h4 className="mb-2 mt-2 startcampaign">What campaign would you like to start?</h4>
                  </div>
                  <p className="mb-2 mt-4">Select Campaign*</p>
                  <div className="custom-dropdown">
                    <button className="form-select mb-1 selectoption" style={{ textAlign: "left" }} type="button" onClick={handleOpen}>
                      {selectedOption || "Product Carbon Footprint"}
                    </button>
                    <div className={`dropdown-content ${isopen ? "show" : ""}`}>
                      {campaignoptions.map((option) => (
                        <div key={option.id} className="dropdown-item">
                          <input className="form-check-input mgr" type="checkbox" checked={option.checked} onChange={() => handleCheckboxChange(option.id)} id={`checkbox-${option.id}`} />
                          <label htmlFor={`checkbox-${option.id}`} className={option.checked ? "optionbg" : ""}>
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 mb-0">Product ID (Global Trade Item Number-GTIN)</p>
                  <p>**14 digits are mandatory for below 3 GTIN</p>

                  <div className="row mt-2">
                    <div className="col-md-4">
                      <p className="mb-2">Each / base unit*</p>
                    </div>
                    <div className="col-md-8 pt">
                      <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="14-digit GTIN"
                        onChange={(e) => {
                          setBaseUnitGTIN(e.target.value);
                          if (isUserPresent) {
                            setUserData({ ...userData, productBaseUnitGTIN: e.target.value });
                          }
                        }}
                        required
                        value={isUserPresent ? userData.productBaseUnitGTIN : baseunitGTIN}
                      />
                    </div>
                  </div>
                  {baseuniterr && <p className="ml-2 warnrd">Your Base Unit GTIN should be of 14 digits</p>}

                  <div className="row">
                    <div className="col-md-4">
                      <p className="mb-2">Case*</p>
                    </div>
                    <div className="col-md-8 pt">
                      <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="14-digit GTIN"
                        onChange={(e) => {
                          setCaseUnitGTIN(e.target.value);
                          if (isUserPresent) {
                            setUserData({ ...userData, productCaseGTIN: e.target.value });
                          }
                        }}
                        required
                        value={isUserPresent ? userData.productCaseGTIN : caseunitGTIN}
                      />
                    </div>
                  </div>
                  {caseuniterr && <p className="ml-2 warnrd">Your Case Unit GTIN should be of 14 digits</p>}

                  <div className="row">
                    <div className="col-md-4">
                      <p className="mb-2">Pallet</p>
                    </div>
                    <div className="col-md-8 pt">
                      <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="14-digit GTIN"
                        onChange={(e) => {
                          setPalletUnitGTIN(e.target.value);
                          if (isUserPresent) {
                            setUserData({ ...userData, productPalletGTIN: e.target.value });
                          }
                        }}
                        value={isUserPresent ? userData.productPalletGTIN : palletunitGTIN}
                      />
                    </div>
                  </div>
                  {palletuniterr && <p className="ml-2 warnrd">Your Pallet Unit GTIN should be of 14 digits</p>}

                  <div className="mb-2">
                    <div>Product Name*</div>
                    <div>
                      <input
                        type="text"
                        className="form-control pname"
                        placeholder="Enter Product Name"
                        onChange={(e) => {
                          setProductNameCampaign(e.target.value);
                          if (isUserPresent) {
                            setUserData({ ...userData, productName: e.target.value });
                          }
                        }}
                        required
                        value={isUserPresent ? userData.productName : productNameCampaign}
                      />
                    </div>
                  </div>

                  <p className="mb-2 mt-4">Select Global Product Classification*</p>
                  <select value={isUserPresent ? userData.globalProductClassification : gpcoption} onChange={handleSelectGPC} className="form-select selectoption" required>
                    <option value="" selected hidden>
                      GPC
                    </option>
                    {gpc.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <p className="mb-2 mt-4">Select Supplier*</p>
                  <select value={isUserPresent ? userData.productSupplier : supplieroption} onChange={handleSelectSupplier} className="form-select selectoption" required>
                    <option value="" selected hidden>
                      GLN + Supplier Name
                    </option>
                    {supplier.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.gln + "     " + option.name}
                      </option>
                    ))}
                  </select>

                  <p className="mb-2 mt-4">Select LCA Term*</p>
                  <select value={isUserPresent ? userData.lcaTerm : lcaoption} onChange={handleSelectLCATerm} className="form-select selectoption" required>
                    <option value="" selected hidden>
                      LCA Term
                    </option>
                    {lcaTerm.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <p className="mb-2 mt-4">Select Calculation Framework*</p>
                  <select value={isUserPresent ? userData.calculationFramework : frameworkoption} onChange={handleSelectFrameworks} className="form-select selectoption" required>
                    <option value="" selected hidden>
                      Calculation Framework
                    </option>
                    {options.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6 pdl">
                <div className="setModuleheight">
                  <div className="p-4 rounded text-left">
                    <p className="font-weight-bold mb-3">
                      <b>Module</b>
                      <span className="linkclick">imde.io</span>
                    </p>
                    <p className="font-weight-bold mb-3">
                      <b>Output</b>
                    </p>
                    {errorcheck && <p className="ml-2 warnrd">You need to select any one of the options</p>}
                    {checkboxes.map((checkbox) => (
                      <div key={checkbox.id} className="d-flex justify-content-between form-check mb-3">
                        <label className="form-check-label" htmlFor={`checkbox-${checkbox.id}`}>
                          {checkbox.name}
                        </label>
                        <input className="form-check-input" type="checkbox" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox.id)} id={`checkbox-${checkbox.id}`} />
                      </div>
                    ))}

                    <div>
                      {manufacturerData && (
                        <div className="mt-4 mb-4 mx-4">
                          <img src={imagePreviewUrl} alt="Manufacturer Logo" className="img-fluid" />
                          <p className="mt-2">Manufacturer: Zwanenberg</p>
                        </div>
                      )}
                      {!manufacturerData && (
                        <div className="mt-4 mb-4 mx-4">
                          {!imagePreviewUrl && (
                            <>
                              <input type="file" className="form-control tooltip-test" title="Please upload a .jpeg or .png file" id="file" accept=".jpg, .jpeg, .png" required onChange={handleImageChange} />
                              <p>*Please upload a .jpeg or .png file</p>
                            </>
                          )}
                          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="img-fluid" />}

                          <br />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="mb-2">Choose Auditor*</p>
                  <select className="form-select pname" value={isUserPresent ? userData.auditor : "Impact Buying"} required>
                    <option value="" selected hidden>
                      Select an Option
                    </option>
                    {auditors.map((auditor) => (
                      <option key={auditor} value={auditor}>
                        {auditor}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="page-btn">
              <input type="submit" name="submit" value={isUserPresent ? "Save & Next" : "Next"} className="btn" />
            </div>
          </div>
        </form>
        <div className="mt-4"></div>
      </div>
    </>
  );
};

export default LaunchCampaign;
