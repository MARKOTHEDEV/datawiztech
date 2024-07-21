import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { saveAs } from "file-saver";
import "./UploadData.css";
import countryLists from "./countries";
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
import * as xlsx from "xlsx";
import UploadDataBody from "./UploadDataBody";
import UploadDataTable from "./UploadDataTable";
import { useMutation } from "@tanstack/react-query";
import { uploadDataApi } from "../../api/data.api";

const UploadData = () => {
  const Navigate = useNavigate();
  const [fileContent, setFileContent] = useState(null);
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";

  const [active, setActive] = useState("upload");
  const [dataTable, setDataTable] = useState(false);
  const [uploadForm, seUploadForm] = useState(true);
  const fileInputRef = useRef(null);
  const [fileupload, setFileUpload] = useState("");
  const [period, setPeriod] = useState("");
  const [dataFile, setDataFile] = useState([]);
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
  const [validate, setValidate] = useState({});
  const [errorOut, setErrOut] = useState([]);
  const { data, error } = UserFriends();

  // if (isLoading) {
  //   return <DataLoader />;
  // }

  if (error) {
  }
  const { token } = UserAuth();

  const validateHeadings = async (data) => {
    const missingHeadings = [];
    const requiredHeadings = [
      "Country Name",
      "Country Code",
      "Indicator Name",
      "Data Short Description",
      "Data Long Description",
      "Price per Year (Dollars)",
      "Data Measurement",
      "Periodicity",
      "Source",
    ];

    for (const obj of data) {
      for (const key of requiredHeadings) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          missingHeadings.push(key);
        }
      }
    }

    // Remove duplicates from missingHeadings
    const uniquekeys = [...new Set(missingHeadings)];

    return { valid: uniquekeys.length === 0, missingHeadings: uniquekeys };
  };

  const validateCountryNames = async (data) => {
    try {
      const countries = await countryLists.map((country) => ({
        name: country.country,
        code: country.code,
      }));

      const invalidIndices = [];

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const countryName = row["Country Name"]?.trim();
        const countryCode = row["Country Code"]?.trim();

        // Check if the country name exists in the list of countries
        const country = countries.find((c) => c.name === countryName);
        if (!country) {
          invalidIndices.push({
            index: i,
            key: [countryName || null, countryCode || null],
            error: "Country name not found or misspelled",
          });
        } else {
          // If country name exists, check if the country code matches
          if (country.code !== countryCode) {
            invalidIndices.push({
              index: i,
              key: [countryName, countryCode],
              error: "Country code does not match the country name",
            });
          }
        }
      }

      return { valid: invalidIndices.length === 0, invalidIndices };
    } catch (error) {
      console.error("Error fetching country data from API:", error);
      return { valid: false, error: "Error fetching country data from API" };
    }
  };

  const processExcel = async (jsonData) => {
    try {
      const headingsValidation = await validateHeadings(jsonData);
      const countryNamesValidation = await validateCountryNames(jsonData);

      return {
        valid: headingsValidation.valid && countryNamesValidation.valid,
        heading: headingsValidation,
        country: countryNamesValidation,
        data: jsonData,
      };
    } catch (error) {
      console.error("Error downloading or processing the Excel file:", error);
      return {
        valid: false,
        error: "Error downloading or processing the Excel file",
      };
    }
  };

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

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

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet);

      // Set the file content in the state
      setFileContent(jsonData);
      // console.log(jsonData)
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUploadContainerClick = () => {
    fileInputRef.current.click();
  };

  const toggleDatatable = () => {
    setDataTable(true);
    seUploadForm(false);
  };

  const toggleDataForm = () => {
    setDataTable(false);
    seUploadForm(true);
  };
  const {mutate,} = useMutation({
    mutationFn:uploadDataApi,
    onSuccess:(data)=>{
      setUploadLoader(false)
      // on Upload set data to the json that was returned
      console.log({UploadedDataSuccess:data})
      setDataTable(data)
    },
    onError:(err)=>{
      setUploadLoader(false)
      toast.error('Something went wrong please upload a correct file')
    }
  })
  const proceed = async () => {
    setUploadLoader(true);
    const emptyFields = [];
    // if (!title) {
    //   emptyFields.push("title");
    // }
    // if (!period) {
    //   emptyFields.push("Period");
    // }
    if (!dataFile) {
      emptyFields.push("file");
    }

    // if (!description) {
    //   emptyFields.push("description");
    // }
    // if (!price) {
    //   emptyFields.push("price");
    // }

    // if (keywords.length === 0) {
    //   emptyFields.push("keywords");
    // }
    // if (
    //   coAuthors.some(
    //     (coAuthor) =>
    //       !coAuthor.partnerId || !coAuthor.role || !coAuthor.percentage
    //   )
    // ) {
    //   emptyFields.push("partnership");
    // }

    if (emptyFields.length > 0) {
      toast.error(`This field(s) ${emptyFields.join(", ")} can not be empty`);
      setUploadLoader(false);
      return;
    }
    console.log({dataFile})
    const form = new FormData();
    form.append('excel_file',dataFile)
    setUploadLoader(true)
    mutate({form})
    // const validateData = await processExcel(fileContent);
    // setValidate(validateData);

    // setTimeout(() => {
    //   setUploadLoader(false);
    //   toggleDatatable();
    // }, 2000);
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
    return
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

  // const friends = data.data.account.friends;
  const friends=[]

  return (
    <div>
      <Header active={active} />
      
      {
      dataTable?
<UploadDataTable
dataTable={dataTable}
        /> :
        <div>
      {uploadForm && (
        <UploadDataBody
          handleCoAuthorChange={handleCoAuthorChange}
          toggleDataForm={toggleDataForm}
          proceed={proceed}
          fileupload={fileupload}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
          toggleDownloadTemp={toggleDownloadTemp}
          downloadTemp={downloadTemp}
          // handleUpload={handleUpload}
          uploadLoader={uploadLoader}
          handleDownload={handleDownload}
          title={title}
          newKeyword={newKeyword}
          handleKeywordChange={handleKeywordChange}
          addKeyword={addKeyword}
          handleTitle={handleTitle}
          handleUploadContainerClick={handleUploadContainerClick}
          uploadError={uploadError}
          errorupload={errorupload}
          upload={upload}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
          handlePeriodChange={handlePeriodChange}
          price={price}
          handlePrice={handlePrice}
          keywords={keywords}
          removeKeyword={removeKeyword}
          showFile={showFile}
          profilepic={profilepic}
          handleYouPerc={handleYouPerc}
          coAuthors={coAuthors}
          AddCoAuthor={AddCoAuthor}
          toggleDescription={toggleDescription}
          removeCoAuthor={removeCoAuthor}
          you={you}
          friends={friends}
        />
      )}
        </div>
    }
     

      {/* {descriptionBox && (
        <Description
          setDescriptionBox={setDescriptionBox}
          setDescription={setDescription}
          description={description}
          toggleDescription={toggleDescription}
        />
      )} */}

       {/* */}
    </div>
  );
};

export default UploadData;
