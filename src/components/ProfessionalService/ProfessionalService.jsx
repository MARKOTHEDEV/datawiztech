import React, { useState } from "react";
import Header from "../Header/Header";
import { Link, useParams } from "react-router-dom";
import SearchBox from "../DataPreview/SearchBox";
import "./ProfessionalMain.css";
import "./ProfessionalAside.css";
import ArticleSection from "./ArticleSection";

const ProfessionalService = () => {
  const { id } = useParams();
  const [active, setActive] = useState("upload")


  return (
    <div>
      <Header active={active}/>
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
                <Link to="/search" className="bread-items">
                  Data Search
                </Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <Link to="#" className="bread-items active">
                  Result
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <SearchBox />
        {/* <NotFound /> */}
      </div>
      <div className="article-details">
        <ArticleSection id={id}/>
      </div>
      {/* <DataFound/> */}
      
    </div>
  );
};

export default ProfessionalService;
