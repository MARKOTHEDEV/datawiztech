import React, { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase/firebase";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./UploadArticle.css";
import { FaXmark } from "react-icons/fa6";
import upload from "../../assets/images/frame-156-aFK.png";
import authorpic from "../../assets/images/ellipse-27-bg-vtZ.png";
import toast from "react-hot-toast";
import ActionLoader from "../Loader/ActionLoader";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { UserAuth } from "../../useContext/useContext";
import FetchFriends from "../../hooks/Friends";
import DataLoader from "../../hooks/DataLoader/DataLoader";

const UploadArticle = () => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const { token, currentUser } = UserAuth();
  const partners = [
    {
      id: "ObjectId(65d7b6ec943034478371a96b)",
      name: "Stephen Rogers",
      partnerType: "Individual",
    },
    {
      id: "ObjectId(65d7b78a943034478371a96d)",
      name: "William Shakes",
      partnerType: "Corperate",
    },
    {
      id: "ObjectId(65d7b7b456c2f6a3a20ffd8d)",
      name: "Barry Allen",
      partnerType: "Individual",
    },
    {
      id: "ObjectId(65d7b817730dd745eff62e30)",
      name: "James Rodriguez",
      partnerType: "Corperate",
    },
    {
      id: "ObjectId(65d7b86c8fdcc3e6d29efbf3)",
      name: "Laura Dean",
      partnerType: "Individual",
    },
  ];
  const [active, setActive] = useState("upload");
  const [articleLoading, setArticleLoading] = useState(false);
  const [coAuthors, setCoAuthors] = useState([]);
  const fileInputRef = useRef(null);

  const [fileupload, setFileUpload] = useState("");
  const [article, setArticle] = useState({});
  const [showFile, setShowFile] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");

  const [you, setYou] = useState(100);
  const { data, isLoading, error } = FetchFriends();

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
  }

  const handleYouPerc = (field, value) => {
    if (field === "percentage" && value > 100) {
      toast.error("Percentage cannot be more than 100.");
      return;
    }

    setYou(value);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB.");
    } else {
      setArticle(file);
      setFileUpload(file.name);
      setShowFile(true);
    }
  };

  const handleUploadContainerClick = () => {
    fileInputRef.current.click();
  };

  // const handleCoAuthorChange = (index, field, value) => {
  //   const updatedCoAuthors = [...coAuthors];
  //   updatedCoAuthors[index][field] = value;
  //   setCoAuthors(updatedCoAuthors);
  // };

  const handleCoAuthorChange = (index, field, value) => {
    const updatedCoAuthors = [...coAuthors];
    if (field === "percentage" && value > 100) {
      toast.error("Percentage cannot be more than 100.");
      return;
    }
    updatedCoAuthors[index][field] = value;
    setCoAuthors(updatedCoAuthors);
  };

  const resetFields = () => {
    setCoAuthors([]);
    setFileUpload("");
    setArticle({});
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
    } else {
      toast.error(
        "Please complete the current co-author details before adding a new one."
      );
    }
  };

  const handleKeywordChange = (e) => {
    setNewKeyword(e.target.value);
  };

  const addKeyword = (e) => {
    e.preventDefault();
    if (newKeyword.trim() !== "" && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const postArticle = async () => {
    setArticleLoading(true);
    const emptyFields = [];
    const summary = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const title = document.getElementById("title").value;

    if (
      !fileInputRef.current.files[0] ||
      !summary ||
      !price ||
      !title ||
      keywords.length === 0 ||
      coAuthors.some(
        (coAuthor) =>
          coAuthor.partnerId === "" ||
          coAuthor.role === "" ||
          coAuthor.percentage === ""
      )
    ) {
      if (!title) emptyFields.push("Title");
      if (!fileInputRef.current.files[0]) emptyFields.push("File upload");
      if (!summary) emptyFields.push("Summary");
      if (!price) emptyFields.push("Price");
      if (keywords.length === 0) emptyFields.push("Keywords");
      if (
        coAuthors.some(
          (coAuthor) =>
            coAuthor.partnerId === "" ||
            coAuthor.role === "" ||
            coAuthor.percentage === ""
        )
      ) {
        emptyFields.push("Co-authors (Name, Role, Percentage");
      }
      if (emptyFields.length > 0) {
        for (const key of emptyFields) {
          toast.error(`${key} can not be empty !`);
        }
        setArticleLoading(false);
        return;
      }
    }
    const partnership = await coAuthors.map((item, index) => {
      const foundPartner = partners.filter((partner) => {
        return item.partnerId === partner.id;
      })[0];

      return {
        ...item,
        partnerType: foundPartner ? foundPartner.partnerType : "",
      };
    });
    try {
      const articleFile = fileInputRef.current.files[0];

      const articleExtension = articleFile.name.split(".").pop();
      const articleFileName = `${articleExtension}.${uuidv4()}-article`;
      const articleStorageRef = ref(storage, `articles/${articleFileName}`);
      await uploadBytes(articleStorageRef, articleFile);

      const articleDownloadUrl = await getDownloadURL(articleStorageRef);

      const articleData = {
        title: title,
        summary: summary,
        price: price,
        keywords: keywords,
        authorType: "Individual",
        partnership: [
          {
            partnerId: currentUser._id,
            role: "Author",
            percentage: you,
          },
          ...partnership.filter(
            (partner) =>
              partner.partnerId !== "" &&
              partner.role !== "" &&
              partner.percentage !== "" &&
              partner.partnerId
          ),
        ],
        file: articleDownloadUrl,
      };
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/upload-article",
        articleData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response.data)
      if (response && response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        resetFields();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading article:", error);
      if (error && error.response && error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Failed to upload article. Please try again later !");
      }
    } finally {
      setArticleLoading(false);
    }
  };

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
                Upload article
              </Link>
            </li>
          </ol>
        </nav>
        <div className="cart-heading d-flex justify-content-between align-items-center">
          <div className="shopping-cart">Upload article</div>
        </div>
      </div>
      <div className="container-fluid upload-container-box">
        <div className="row">
          <div className="col-lg-6">
            <div className="input__wrapper mt-3">
              <input
                type="text"
                id="title"
                className="input__field pass-input"
                placeholder="Your keywords"
              />
              <label htmlFor="title" className="input__label pass-label">
                Title
              </label>
            </div>
            <div className="input__wrapper mt-3 position-relative">
              <textarea
                id="description"
                className="textarea__field textarea-input"
                placeholder="Your Description"
              ></textarea>
              <label htmlFor="description" className="textarea__label">
                Article summary
              </label>
            </div>
            <div className="input__wrapper mt-3">
              <input
                type="number"
                id="price"
                className="input__field pass-input"
                placeholder="Your Price"
              />
              <label htmlFor="price" className="input__label pass-label">
                Price(N)
              </label>
            </div>
            <div className="d-flex justify-content-between mt-3 align-items-center">
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
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-lg-end justify-content-center pt-lg-0 pt-5">
            <div
              className="upload-container"
              onClick={handleUploadContainerClick}
            >
              <div className="upload-content">
                <img className="upload-icon" src={upload} alt=".." />
                <div className="upload-info">Click here to upload document</div>
                {showFile && <p className="picked-file mt-3">{fileupload}</p>}
              </div>
            </div>
            <input
              type="file"
              id="upload"
              className="d-none"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.doc"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-8">
            <div className="add-co-author mb-3">Add Co-authors</div>
            <div>
              <div className="row my-1">
                <div className="col-lg-6">
                  <div className="input__wrapper emailinputcontainer d-flex align-items-center">
                    <div className="">
                      <img
                        src={
                          !currentUser.image ? profilepic : currentUser.image
                        }
                        alt=""
                        className="author-pic"
                      />
                    </div>
                    <select className="input__field email-input">
                      <option value={currentUser._id}>
                        {currentUser.first_name} {currentUser.last_name}
                      </option>
                    </select>
                    <label className="upload__label">Co-author 00</label>
                  </div>
                </div>
                <div className="col-lg-3 mt-lg-0 mt-4">
                  <div className="input__wrapper emailinputcontainer mb-4">
                    <select className="input__field email-input" value="Author">
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
              {coAuthors.map((coAuthor, index) => (
                <div className="row my-1" key={index}>
                  <div className="col-lg-6">
                    <div className="input__wrapper emailinputcontainer d-flex align-items-center">
                      <div className="">
                        <img src={authorpic} alt="" className="author-pic" />
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
                        {partners.map((item, index) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                      <label className="upload__label">
                        Co-author {index + 1}
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="input__wrapper emailinputcontainer mb-4">
                      <select
                        className="input__field email-input"
                        value={coAuthor.role}
                        onChange={(e) =>
                          handleCoAuthorChange(index, "role", e.target.value)
                        }
                      >
                        <option value="">Choose a role</option>
                        <option value="Author">Author</option>
                        <option value="Co-Author">Co Author</option>
                      </select>
                      <label className="input__label email-label">Role</label>
                    </div>
                  </div>
                  <div className="col-lg-3">
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
                        Percentage
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="col-lg-6">
                  <div className="add-co-author-btn mb-4" onClick={AddCoAuthor}>
                    Add co-author
                  </div>
                  <div
                    className={`update-article ${
                      articleLoading
                        ? "d-flex align-items-center justify-content-center"
                        : "text-center"
                    }`}
                    onClick={postArticle}
                    style={{
                      cursor: articleLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {articleLoading ? <ActionLoader /> : "Update article"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArticle;