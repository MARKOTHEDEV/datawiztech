import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import upload from "../../assets/images/frame-156-aFK.png";
import Referee from "./Referee";
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";

const Verification = () => {
  const { currentUser } = UserAuth();
  const fileInputRef = useRef(null);
  const [fileupload, setFileUpload] = useState("");
  const [showFile, setShowFile] = useState(false);
  const [referee, setReferee] = useState(false);
  const [verify, setVerify] = useState(true);
  const [instruction, setInsttruction] = useState(
    "Kindly upload your document for verification"
  );
  const [heading, setHeading] = useState("Account Verification");
  const [document, setDocument] = useState({
    documentType: "",
    documentNumber: "",
    country: ""
  });
  const [documentFile, setDocumentFile] = useState("");

  const handleForm = (e) => {
    const { name, value } = e.target;
    setDocument((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleReferee = () => {
    if (document.documentType && document.documentNumber && fileupload) {
      setReferee(true);
      setVerify(false);
      setHeading("Add Referees");
      setInsttruction("Kindly fill in referee information");
    } else {
      const emptyField = [];
      if (!document.documentType) {
        emptyField.push("document type");
      }

      if (!document.documentNumber) {
        emptyField.push("document number");
      }

      if (!fileupload) {
        emptyField.push("document file");
      }

      if (emptyField.length > 0) {
        toast.error(`This field(s) ${emptyField.join(", ")} can not be empty`);
        return;
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB.");
      return;
    } else {
      setFileUpload(file.name);
      setDocumentFile(file);
      setShowFile(true);
    }
  };

  const handleInputFocus = (e) => {
    const inputWrapper = e.target.parentElement;
    // setInputStyle({ ...inputStyle, [e.target.id]: { backgroundColor: 'white'} });
    inputWrapper.style.borderColor = "#17b24e";
    inputWrapper.querySelector(".input__label").style.color = "#17b24e";
    // inputWrapper.querySelector(".input__icon").style.color = "#17b24e";
    e.target.setAttribute(
      "data-placeholder",
      e.target.getAttribute("placeholder")
    );
    e.target.setAttribute("placeholder", "");
  };

  const handleInputBlur = (e) => {
    const inputWrapper = e.target.parentElement;
    inputWrapper.style.borderColor = "#d8d8d8";
    inputWrapper.querySelector(".input__label").style.color = "#a7a7a7";
    // inputWrapper.querySelector(".input__icon").style.color = "#a7a7a7";
    e.target.setAttribute(
      "placeholder",
      e.target.getAttribute("data-placeholder")
    );
    e.target.setAttribute("data-placeholder", "");
  };

  const handleUploadContainerClick = () => {
    // Trigger click event of the file input when the upload container is clicked
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/" className="bread-items">
                Home
              </Link>
            </li>
            <li class="breadcrumb-item">
              <Link to="/profile" className="bread-items">
                Profile
              </Link>
            </li>
            <li class="breadcrumb-item" aria-current="page">
              <Link to="#" className="bread-items active">
                Account Verification
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="verification-header">{heading}</div>
      <p class="verification-sub-header">{instruction}</p>
      <div
        className={`row flex-wrap-reverse verify-account-container ${
          verify ? "active" : ""
        }`}
      >
        <div className="col-lg-6 py-3">
          <div className="input__wrapper emailinputcontainer mb-4">
            <select
              // type="email"
              className="input__field email-input"
              // placeholder="Email address"
              id="email"
              name="documentType"
              value={document.documentType}
              onChange={handleForm}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
            >
              <option>Choose document type</option>
              {currentUser.role === "Individual" ? (
                <option value="National ID">National ID</option>
              ) : (
                <option value="CAC Document">CAC Document</option>
              )}
            </select>
            <label for="email" className="input__label email-label">
              Document type
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4">
            <input
              type="text"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="verifyNigeria"
              name="country"
              value={document.country}
              onChange={handleForm}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
            />
            <label for="verifyNigeria" className="input__label email-label">
              Country
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4">
            <input
              type="number"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="sortNumber"
              name="documentNumber"
              value={document.documentNumber}
              onChange={handleForm}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
            />
            <label for="sortNumber" className="input__label email-label">
              Document number
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div class="verify-btn" onClick={toggleReferee}>
            Next
          </div>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center py-3">
          <div class="upload-container" onClick={handleUploadContainerClick}>
            <div class="upload-content">
              <img class="upload-icon" src={upload} alt=".." />
              <div htmlFor="upload" class="upload-info">
                Click here to upload document
              </div>
              {showFile && <p className="picked-file mt-3">{fileupload}</p>}
            </div>
          </div>
          <input
            type="file"
            id="upload"
            className="d-none"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <Referee
        referee={referee}
        handleInputBlur={handleInputBlur}
        handleInputFocus={handleInputFocus}
        documentFile={documentFile}
        document={document}
        setDocumentFile={setDocumentFile}
        setFileUpload={setFileUpload}
        setDocument={setDocument}
      />
    </div>
  );
};

export default Verification;
