import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./Upload.css";

import SearchBar from "../DataSearch/SearchBar";
import Article from "./Article";
import Data from "./Data";

const Upload = () => {
  const [active, setActive] = useState("upload");
  const [breadcrumb, setbreadcrumb] = useState("Article");
  const [dataActive, setDataActive] = useState(false);
  const [articleActive, setArticleActive] = useState(true);
  const [data, setData] = useState(false);
  const [article, setArticle] = useState(true);
  const [uploadTitle, setUploadTitle] = useState("Upload article");
  const [searchHint, setSearchHint] = useState("article");
  const [uploadText, setUploadText] = useState("Upload new article");
  const [uploadUrl, setUploadUrl] = useState("/upload/upload-article");

  const [search, setSearch] = useState("")
  const handleChange = (value)=>{
    const term = value
    setSearch(term)
  }


  const toggleDataBread = () => {
    setbreadcrumb("Data");
    setSearch("")
    setUploadText("Upload new data");
    setUploadTitle("Upload data");
    setUploadUrl("/upload/upload-data");
    setSearchHint("data by title or period")
    setData(true);
    setDataActive(true);
    setArticleActive(false);
    setArticle(false);
  };
  const toggleArticleBread = () => {
    setbreadcrumb("Article");
    setSearch("")
    setSearchHint("article by title")
    setUploadText("Upload new article");
    setUploadTitle("Upload article");
    setUploadUrl("/upload/upload-article");
    setArticle(true);
    setArticleActive(true);
    setDataActive(false);
    setData(false);
  };
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
            <li className="breadcrumb-item" aria-current="page">
              <Link to="#" className="bread-items active">
                {breadcrumb}
              </Link>
            </li>
          </ol>
        </nav>
        <div className="cart-heading d-flex justify-content-between align-items-center">
          <div className="shopping-cart">{uploadTitle}</div>
        </div>
        <div className="row mb-2 mt-3">
          <div className="col-lg-5">
            <div className="upload-navigation-tab">
              <div
                className={`article-tab ${articleActive ? "active" : ""}`}
                onClick={toggleArticleBread}
              >
                Article
              </div>
              <div
                className={`data-tab ${dataActive ? "active" : ""}`}
                onClick={toggleDataBread}
              >
                Data
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 my-2">
            <div className="search-box-container">
              <div className="datasearch-box">
                <div className="hero-input d-flex justify-content-between">
                  <div className="data-search-div">
                    <input
                      type="text"
                      className="data-search"
                      value= {search}
                      style={{color:'black'}}
                      onChange={(e)=>{handleChange(e.target.value)}}
                      placeholder={`Search for ${searchHint}`}
                    />
                  </div>
                  {/* <div
            className={`data-search-section ${
              searchLoading
                ? "d-flex align-items-center justify-content-center"
                : "text-center"
            }`}
            onClick={handleSesearchTermarch}
            style={{
              cursor: searchLoading ? "not-allowed" : "pointer",
            }}
          >
            {searchLoading ? <ActionLoader /> : "Search"}
          </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 my-2">
            <Link to={uploadUrl}>
              <div className="data-upload-btn">{uploadText}</div>
            </Link>
          </div>
        </div>
        {article && <Article search={search} />}
        {data && <Data search={search} />}
      </div>
    </div>
  );
};

export default Upload;
