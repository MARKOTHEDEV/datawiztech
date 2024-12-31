import React, { useRef, useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./UploadArticle.css";
import { FaXmark } from "react-icons/fa6";
import upload from "../../assets/images/frame-156-aFK.png";
import authorpic from "../../assets/images/ellipse-27-bg-vtZ.png";

const EditArticle = () => {
  const [active, setActive] = useState("upload");

  return (
    <div>
      <Header active={active} />
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="bread-items">
                Data Upload
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/" className="bread-items">
                Article
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="#" className="bread-items active">
                Edit article
              </Link>
            </li>
          </ol>
        </nav>
        <div className="cart-heading d-flex justify-content-between align-items-center">
          <div className="shopping-cart">Edit article</div>
        </div>
      </div>
      <div className="container-fluid upload-container-box">
        <div className="row">
          <div className="col-lg-6">
            <div className="input__wrapper mt-3 position-relative">
              <textarea
                id="description"
                className="textarea__field textarea-input"
                placeholder="Your Description"
                //   onFocus={handleInputFocus}
                //   onBlur={handleInputBlur}
                autoComplete="off"
              ></textarea>
              <label for="description" className="textarea__label">
                Article summary
              </label>
            </div>
            <div className="input__wrapper mt-3">
              <input
                type="number"
                id="price"
                className="input__field pass-input"
                placeholder="Your Price"
                //   onFocus={handleInputFocus}
                //   onBlur={handleInputBlur}
                autoComplete="off"
              />
              <label for="price" className="input__label pass-label">
                Price(N)
              </label>
            </div>
            <div className="keyword-wrapper mt-3">
              <div for="keyword" className="keyword__label">
                Price(N)
              </div>
              <div className="keywords-box">
                {[...Array(8)].map((star, index) => (
                  <div className="keyword-items">
                    <div className="keyword">Nigeria</div>
                    <div className="keyword-icon">
                      <FaXmark />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="col-lg-1"></div> */}
          <div className="col-lg-6 d-flex align-items-cente justify-content-lg-end justify-content-center pt-lg-0 pt-5">
           
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-8">
            <div className="add-co-author">Add Co-authors</div>
            <div>
              <div className="row mt-3 mb-1 ">
                <div className="col-lg-6">
                  <div className="input__wrapper emailinputcontainer d-flex align-items-center">
                    <div className="">
                      <img src={authorpic} alt="" className="author-pic" />
                    </div>
                    <select
                      // type="email"
                      className="input__field email-input"
                      // placeholder="Email address"
                      id="role"
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      autoComplete="off"
                    >
                      <option>Dr. Oluwajane Ademidoe</option>
                      <option>Dr. Oluwajane Ademidoe</option>
                      <option>Dr. Oluwajane Ademidoe</option>
                    </select>

                    <label for="number" className="upload__label">
                      Co-author 1
                    </label>
                    {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="input__wrapper emailinputcontainer mb-4">
                    <select
                      // type="email"
                      className="input__field email-input"
                      // placeholder="Email address"
                      id="role"
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      autoComplete="off"
                    >
                      <option>Co Author</option>
                      <option>Author</option>
                      <option>Amount</option>
                    </select>
                    <label for="role" className="input__label email-label">
                      Role
                    </label>
                    {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="input__wrapper emailinputcontainer mb-4">
                    <select
                      // type="email"
                      className="input__field email-input"
                      // placeholder="Email address"
                      id="percentage"
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      autoComplete="off"
                    >
                      <option>10%</option>
                      <option>20%</option>
                      <option>30%</option>
                    </select>
                    <label
                      for="percentage"
                      className="input__label email-label"
                    >
                      percentage
                    </label>
                    {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-2">
                  <div className="input__wrapper emailinputcontainer d-flex align-items-center">
                    <div className="">
                      <img src={authorpic} alt="" className="author-pic" />
                    </div>
                    <select
                      // type="email"
                      className="input__field email-input"
                      // placeholder="Email address"
                      id="role"
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      autoComplete="off"
                    >
                      <option>Dr. Oluwajane Ademidoe</option>
                      <option>Dr. Oluwajane Ademidoe</option>
                      <option>Dr. Oluwajane Ademidoe</option>
                    </select>

                    <label for="number" className="upload__label">
                      Co-author 1
                    </label>
                    {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="input__wrapper emailinputcontainer mb-2">
                    <select
                      // type="email"
                      className="input__field email-input"
                      // placeholder="Email address"
                      id="role"
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      autoComplete="off"
                    >
                      <option>Co Author</option>
                      <option>Author</option>
                      <option>Amount</option>
                    </select>
                    <label for="role" className="input__label email-label">
                      Role
                    </label>
                    {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="input__wrapper emailinputcontainer">
                    <select
                      // type="email"
                      className="input__field email-input"
                      // placeholder="Email address"
                      id="percentage"
                      // onFocus={handleInputFocus}
                      // onBlur={handleInputBlur}
                      autoComplete="off"
                    >
                      <option>10%</option>
                      <option>20%</option>
                      <option>30%</option>
                    </select>
                    <label
                      for="percentage"
                      className="input__label email-label"
                    >
                      percentage
                    </label>
                    {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div class="add-co-author-btn mb-4">Add co-author</div>
                  <div class="update-article">Update article</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
