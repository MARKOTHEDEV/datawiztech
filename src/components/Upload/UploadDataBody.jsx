import React from "react";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";
import CustomControlsVideoPlayer from "./VideoPlayer";
import { MdOutlineDelete } from "react-icons/md";

const UploadDataBody = ({
  handleCoAuthorChange,
  toggleDataForm,
proceed,
  fileupload,
  fileInputRef,
  handleFileUpload,
  toggleDownloadTemp,
  downloadTemp,
  uploadLoader,
  handleDownload,
  title,
  newKeyword,
  handleKeywordChange,
  addKeyword,
  handleTitle,
  handleUploadContainerClick,
  uploadError,
  errorupload,
  upload,
  handleInputFocus,
  handleInputBlur,
  handlePeriodChange,
  price,
  handlePrice,
  keywords,
  removeKeyword,
  showFile,
  profilepic,
  handleYouPerc,
  coAuthors,
  AddCoAuthor,
  toggleDescription,
  removeCoAuthor,
  you,
  friends,
}) => {
  const { currentUser } = UserAuth();
  return (
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
              Price(Dollar)
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
                            !currentUser.image ? profilepic : currentUser.image
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
                          <img src={profilepic} alt="" className="author-pic" />
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
                            handleCoAuthorChange(index, "role", e.target.value)
                          }
                        >
                          <option value="">Choose a role</option>
                          <option value="Author">Author</option>
                          <option value="Co-author">Co-author</option>
                          <option value="Contributor">Contributor</option>
                        </select>
                        <label className="input__label email-label">Role</label>
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
            onClick={proceed}
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
  );
};

export default UploadDataBody;
