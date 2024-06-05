import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./UploadData.css";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import upload from "../../assets/images/frame-156-aFK.png";
import errorupload from "../../assets/images/error-upload.png";
import Description from "./Description";
import SuccessUpload from "./SuccessUpload";
import DeleteData from "./DeleteData";
import CustomControlsVideoPlayer from "./VideoPlayer";
import toast from "react-hot-toast";
import yearlyTemplate from "../../assets/templates/yearlyDWT.xlsx";
import quarterlyTemplate from "../../assets/templates/quarterlyDWT.xlsx";
import monthlyTemplate from "../../assets/templates/monthlyDWT.xlsx";
import dailyTemplate from "../../assets/templates/dailyDWT.xlsx";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import FetchFriends from "../../hooks/Friends";
import UserFriends from "../../hooks/UserFriends";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";

const UploadData = () => {
  const Navigate = useNavigate()
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";

  const [active, setActive] = useState("upload");
  const [dataName, setDataName] = useState("The first data");
  const fileInputRef = useRef(null);
  const [fileupload, setFileUpload] = useState("");
  const [period, setPeriod] = useState("");
  const [dataFile, setDataFile] = useState("");
  const [uploadLoader, setUploadLoader] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [showFile, setShowFile] = useState(true);
  const [success, setSuccess] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const [descriptionBox, setDescriptionBox] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [downloadTemp, setDownloadTemp] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  // const [coAuthors, setCoAuthors] = useState([
  //   { partnerId: "", role: "", percentage: "" },
  // ]);
  const [coAuthors, setCoAuthors] = useState([]);

  const { currentUser } = UserAuth();
  const [you, setYou] = useState(100);
  const { data, isLoading, error } = UserFriends();

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
  }
  const { token } = UserAuth();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const toggleDescription = () => {
    setDescriptionBox(!descriptionBox);
  };

  const toggleDownloadTemp = () => {
    setDownloadTemp(!downloadTemp);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleYouPerc = (field, value) => {
    if (field === "percentage" && value > 100) {
      toast.error("Percentage cannot be more than 100.");
      return;
    }

    setYou(value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Check if file is not in excel format
    if (!file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      setUploadError(true);
      return;
    }

    setUploadError(false);

    // Check if file size exceeds 1MB
    if (file.size > 1024 * 1024) {
      // Show toast message for file size error
      toast.error("File size exceeds 1MB");
      return;
    }
    const fileName = file.name;
    setFileUpload(fileName);
    setShowFile(true);
    setDataFile(file);
  };

  const handleUploadContainerClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadLoader(true);

    try {
      const emptyFields = [];
      if (!title) {
        emptyFields.push("title");
      }
      if (!period) {
        emptyFields.push("Period");
      }
      if (!dataFile) {
        emptyFields.push("file");
      }

      if (!description) {
        emptyFields.push("description");
      }
      if (!price) {
        emptyFields.push("price");
      }

      if (keywords.length === 0) {
        emptyFields.push("keywords");
      }
      if (
        coAuthors.some(
          (coAuthor) =>
            !coAuthor.partnerId || !coAuthor.role || !coAuthor.percentage
        )
      ) {
        emptyFields.push("partnership");
      }

      const formattedPartnership = coAuthors.map(
        ({ partnerId, role, percentage }) => ({
          partnerId,
          role,
          percentage,
        })
      );

      if (emptyFields.length > 0) {
        toast.error(`This field(s) ${emptyFields.join(", ")} can not be empty`);
        setUploadLoader(false);
        return;
      }

      const formData = new FormData();
      formData.append("periodicity", period);
      formData.append("file", dataFile);
      formData.append("summary", description);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("keywords", keywords);
      formData.append(
        "partnership",
        JSON.stringify([
          {
            partnerId: currentUser._id,
            role: "Author",
            percentage: you,
          },
          ...formattedPartnership,
        ])
      );

      const url = `https://datawiztechapi.onrender.com/api/v1/upload-data`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response && response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        setSuccess(true);
        // resetFields();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "Some countries names or codes are wrong"
      ) {
        const err = error.response.data;
        toast.error(err.message);
        // Navigate("")
      } else if (error && error.response && error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Failed to upload file. Please try again later !");
      }
    }

    setUploadLoader(false);
  };

  const handleDownload = async (templatePeriod) => {
    try {
      let url;
      let filename;
      if (templatePeriod === "Yearly") {
        url = yearlyTemplate;
        filename = "DWTYearlyTemplate.xlsx";
      } else if (templatePeriod === "Quarterly") {
        url = quarterlyTemplate;
        filename = "DWTQuarterlyTemplate.xlsx";
      } else if (templatePeriod === "Monthly") {
        url = monthlyTemplate;
        filename = "DWTMonthlyTemplate.xlsx";
      } else {
        url = dailyTemplate;
        filename = "DWTDailyTemplate.xlsx";
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloadTemp(false);
    } catch (error) {
      console.error("Error downloading file:", error);
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

  const handleKeywordChange = (e) => {
    setNewKeyword(e.target.value);
  };

  const addKeyword = (e) => {
    e.preventDefault();
    if (newKeyword.trim() !== "" && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    } else {
      toast.error("Keyword can't be added because it's empty or already added");
      return;
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleCoAuthorChange = (index, field, value) => {
    const updatedCoAuthors = [...coAuthors];
    if (field === "percentage" && value > 100) {
      toast.error("Percentage cannot be more than 100.");
      return;
    }
    updatedCoAuthors[index][field] = value;
    setCoAuthors(updatedCoAuthors);
  };

  const removeCoAuthor = (index) => {
    const updatedCoAuthors = [...coAuthors];
    updatedCoAuthors.splice(index, 1);
    setCoAuthors(updatedCoAuthors);
  };

  const resetFields = () => {
    setCoAuthors([]);
    setFileUpload("");
    setShowFile(false);
    setKeywords([]);
    setNewKeyword("");
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    fileInputRef.current.value = "";
  };

  const AddCoAuthor = () => {
    const totalPercentage =
      coAuthors.reduce(
        (sum, coAuthor) => sum + parseInt(coAuthor.percentage || 0),
        0
      ) + you;

    if (totalPercentage === 100) {
      toast.error("Total percentage is already 100.");
      return;
    }

    const remainingPercentage = 100 - totalPercentage;
    if (remainingPercentage <= 0) {
      toast.error("Total percentage has exceeded 100.");
      return;
    }

    const defaultPercentage =
      // coAuthors.length > 0 ? remainingPercentage / 2 : 100;
      coAuthors.length === 0 ? 100 : Math.floor(remainingPercentage);
    if (
      coAuthors.every(
        (coAuthor) => coAuthor.partnerId && coAuthor.role && coAuthor.percentage
      )
    ) {
      setCoAuthors([
        ...coAuthors,
        {
          partnerId: "",
          role: "",
          percentage: defaultPercentage,
        },
      ]);
      // setCoAuthors([...coAuthors]);
    } else {
      toast.error(
        "Please complete the current co-author details before adding a new one."
      );
    }
  };

  const friends = data.data.account.friends;

  return (
    <div>
      <Header active={active} />
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/upload" className="bread-items">
                Upload
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="#" className="bread-items active">
                Upload Data
              </Link>
            </li>
          </ol>
        </nav>
        <div className="cart-heading d-flex justify-content-between align-items-center">
          <div className="shopping-cart">Upload Data</div>
        </div>
        <div className="row flex-lg-row flex-wrap-reverse">
          <div className="col-lg-6 mt-4">
            <div className="position-relative">
              <div className="update-article" onClick={toggleDownloadTemp}>
                Download template (by periodicity)
              </div>
              <div
                className={`download-template-box ${
                  downloadTemp ? "active" : ""
                } `}
              >
                <div
                  className="hover-template"
                  onClick={() => handleDownload("Yearly")}
                >
                  <div className="download-template-period">Yearly</div>
                </div>
                <div
                  className="hover-template"
                  onClick={() => handleDownload("Quarterly")}
                >
                  <div className="download-template-period">Quarterly</div>
                </div>
                <div
                  className="hover-template"
                  onClick={() => handleDownload("Monthly")}
                >
                  <div className="download-template-period">Monthly</div>
                </div>
                <div
                  className="hover-template"
                  onClick={() => handleDownload("Daily")}
                >
                  <div className="download-template-period">Daily</div>
                </div>
              </div>
            </div>
            <div className="input__wrapper my-3">
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitle}
                className="input__field pass-input"
                placeholder="Your title"
              />
              <label htmlFor="title" className="input__label pass-label">
                Title
              </label>
            </div>
            <div className="mt-3">
              <div
                className="upload-data-container"
                onClick={handleUploadContainerClick}
              >
                <div className="upload-content">
                  <img
                    className="upload-icon"
                    src={uploadError ? errorupload : upload}
                    alt=".."
                  />
                  <div htmlFor="upload" className="upload-info">
                    Click here to upload excel sheet(s)
                  </div>
                  <div htmlFor="upload" className="error-upload-info">
                    {uploadError &&
                      "Invalid file format. Only .xls files allowed"}
                  </div>
                  <div htmlFor="upload" className="click-upload-info mt-4">
                    {uploadError && "Click here to select another file"}
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
            <div className="input__wrapper emailinputcontainer my-4">
              <select
                className="input__field email-input"
                id="periodicity"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handlePeriodChange}
                autoComplete="off"
              >
                <option value="">Choose a period</option>
                <option value="Yearly">Yearly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Monthly">Monthly</option>
                <option value="Daily">Daily</option>
              </select>
              <label for="periodicity" className="input__label email-label">
                Period type
              </label>
            </div>
            <div className="input__wrapper mt-3">
              <input
                type="number"
                id="price"
                value={price}
                onChange={handlePrice}
                className="input__field pass-input"
                placeholder="Your Price"
              />
              <label htmlFor="price" className="input__label pass-label">
                Price(N)
              </label>
            </div>
            <div className="d-flex justify-content-between my-3 align-items-center">
              <div className="input__wrapper w-75">
                <input
                  type="text"
                  id="newKeyword"
                  className="input__field pass-input"
                  placeholder="Your keywords"
                  value={newKeyword}
                  onChange={handleKeywordChange}
                />
                <label htmlFor="newKeyword" className="input__label pass-label">
                  Keyword
                </label>
              </div>
              <div className="update-article px-2" onClick={addKeyword}>
                Add Keyword
              </div>
            </div>
            <div
              className={`keyword-wrapper mt-3 ${
                keywords.length === 0 ? "py-3" : ""
              }`}
            >
              <div className="keyword__label">Keywords</div>
              <div className="keywords-box">
                {keywords.map((keyword, index) => (
                  <div className="keyword-items" key={index}>
                    <div className="keyword">{keyword}</div>
                    <div
                      className="keyword-icon"
                      onClick={() => removeKeyword(keyword)}
                    >
                      <FaXmark />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <div className="add-co-author mb-3">Add Co-authors</div>
                <div>
                  <div className="row my-1">
                    <div className="col-lg-6">
                      <div className="input__wrapper emailinputcontainer d-flex align-items-center">
                        <div className="">
                          <img
                            src={
                              !currentUser.image
                                ? profilepic
                                : currentUser.image
                            }
                            alt=""
                            className="author-pic"
                          />
                        </div>
                        <select
                          className="input__field email-input"
                          // value={c}
                          // onChange={(e) =>
                          //   handleYouPerc(
                          //     e.target.value
                          //   )
                          // }
                        >
                          <option value={currentUser._id}>
                            {currentUser.first_name} {currentUser.last_name}
                          </option>
                        </select>
                        <label className="upload__label">Co-author 00</label>
                      </div>
                    </div>
                    <div className="col-lg-3 mt-lg-0 mt-4">
                      <div className="input__wrapper emailinputcontainer mb-4">
                        <select
                          className="input__field email-input"
                          value="Author"
                          // onChange={(e) =>
                          //   handleCoAuthorChange(
                          //     index,
                          //     "role",
                          //     e.target.value
                          //   )
                          // }
                        >
                          <option value="">Choose a role</option>
                          <option selected value="Author">
                            Author
                          </option>
                          <option value="Co-author">Co-author</option>
                          <option value="Contributor">Contributor</option>
                        </select>
                        <label className="input__label email-label">Role</label>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="row">
                        <div className="col-12">
                          <div className="input__wrapper">
                            <input
                              type="number"
                              id={`percentage-${currentUser._id}`}
                              className="input__field pass-input"
                              placeholder="Percentage"
                              value={you}
                              onChange={(e) =>
                                handleYouPerc("percentage", e.target.value)
                              }
                            />
                            <label
                              htmlFor={`percentage-${currentUser._id}`}
                              className="input__label email-label"
                            >
                              Percentage
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {coAuthors.map((coAuthor, index) => (
                    <div className="row my-1" key={index}>
                      <div className="col-lg-6">
                        <div className="input__wrapper emailinputcontainer d-flex align-items-center">
                          <div className="">
                            <img
                              src={profilepic}
                              alt=""
                              className="author-pic"
                            />
                          </div>
                          <select
                            className="input__field email-input"
                            value={coAuthor.name}
                            onChange={(e) =>
                              handleCoAuthorChange(
                                index,
                                "partnerId",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Choose a co-author</option>
                            {friends.map((item, index) => (
                              <option value={item.friend._id}>
                                {item.friend.first_name} {item.friend.last_name}
                              </option>
                            ))}
                          </select>
                          <label className="upload__label">
                            Co-author {index + 1}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 mt-lg-0 mt-4">
                        <div className="input__wrapper emailinputcontainer mb-4">
                          <select
                            className="input__field email-input"
                            value={coAuthor.role}
                            onChange={(e) =>
                              handleCoAuthorChange(
                                index,
                                "role",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Choose a role</option>
                            <option value="Author">Author</option>
                            <option value="Co-author">Co-author</option>
                            <option value="Contributor">Contributor</option>
                          </select>
                          <label className="input__label email-label">
                            Role
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="row">
                          <div className="col-9">
                            <div className="input__wrapper">
                              <input
                                type="number"
                                id={`percentage-${index}`}
                                className="input__field pass-input"
                                placeholder="Percentage"
                                value={coAuthor.percentage}
                                onChange={(e) =>
                                  handleCoAuthorChange(
                                    index,
                                    "percentage",
                                    e.target.value
                                  )
                                }
                                max={100}
                                maxLength={100}
                              />
                              <label
                                htmlFor={`percentage-${index}`}
                                className="input__label email-label"
                              >
                                Percent
                              </label>
                            </div>
                          </div>
                          {index > 0 && (
                            <div className="col-lg-1">
                              <MdOutlineDelete
                                className="mt-3 delete-co-author-icon"
                                onClick={() => removeCoAuthor(index)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="row">
                    <div className="col-lg-6">
                      <div
                        className="add-co-author-btn mb-4"
                        onClick={AddCoAuthor}
                      >
                        Add co-author
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <p className="periodicity-check mt-4">
              <span className="periodicity-span">
                Do you have the same data for other periodicity?
              </span>
              <span className="periodicity-span-check">
                {" "}
                If yes, click here
              </span>
            </p> */}
            <div className="update-article mt-3" onClick={toggleDescription}>
              Add Description
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-5">
            <div className="data-upload-video-container">
              <CustomControlsVideoPlayer />
            </div>
          </div>
        </div>
        <div className="row mt-5 py-5">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div
              className={`update-article ${
                uploadLoader
                  ? "d-flex align-items-center justify-content-center"
                  : "text-center"
              }`}
              onClick={handleUpload}
              style={{
                cursor: uploadLoader ? "not-allowed" : "pointer",
              }}
            >
              {uploadLoader ? <ActionLoader /> : "Proceed"}
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
      {descriptionBox && (
        <Description
          setDescriptionBox={setDescriptionBox}
          setDescription={setDescription}
          description={description}
          toggleDescription={toggleDescription}
        />
      )}
      {success && <SuccessUpload />}
      {/* {deleteBox && ( */}
      {/* )} */}
    </div>
  );
};

export default UploadData;
