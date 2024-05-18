import React, { useState } from "react";
import "../DataSearch/DataSearch.css";
import "../DataSearch/DataFilter.css";
import "../DataSearch/YearRange.css";
import "../DataSearch/DataFound.css";
import "./DataPreview.css";
import "./DataAside.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import ".././Header/Header.css";
import remove_filter_item from "../../assets/images/frame-160-nE5.png";
// import middleimage from "../../assets/images/undrawfilesearchingduff-1-Hyj.png";
import showall from "../../assets/images/frame-158-c3B.png";
import DataFilter from "../DataSearch/DataFilter";
import DataFound from "../DataSearch/DataFound";
import DataAside from "./DataAside";
import TablePreview from "./TablePreview";
import SearchBox from "./SearchBox";
import DataCommentSection from "./DataCommentSection";
import SearchFilter from "./SearchFilter";
// import NotFound from "./NotFound";

const DataPreview = () => {
  // const [searchHistory, setHistory] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  // const showhistory = () => {
  //   setHistory(true);
  // };

  // const showFilter = () => {
  //   setFilterBtn(true);
  // };
  // const hideFilter = () => {
  //   setFilterBtn(false);
  // };

  // const removeHistory = () => {
  //   setHistory(false);
  // };

  // const filterArr = [
  //   { item: "Senegal" },
  //   { item: "1990-2020" },
  //   { item: "NGN" },
  //   { item: "Nigeria" },
  //   { item: "Export of good and services" },
  //   { item: "World Bank" },
  //   { item: "SNG" },
  //   { item: "Congo" },
  //   { item: "International Research institute" },
  // ];

  return (
    <div>
      <Header active={"home"}/>
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
        <SearchFilter setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        {/* <NotFound /> */}
      </div>
      {/* <div className="container-fluid pt-4">
        <div className="row filter-box px-lg-4 px-3">
          <div className="preview-filter-container">
            {filterArr.map((filter, index) => (
              <div class="filter-items" key={index}>
                <div class="filter-title">{filter.item}</div>
                <div className="filter-cancel-box">
                  <img
                    class="remove-filter"
                    src={remove_filter_item}
                    alt=".."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div className="container-fluid pt-3">
        <div className="row data-preview-section">
          <div className="col-lg-4 preview-aside">
            <div className=" pb-4">
              <div className="d-flex justify-content-end px-3 pt-2">
                <div class="showall-content">
                  <img class="showall-icon" src={showall} alt="..." />
                  <p class="showall-text">Show all results</p>
                </div>
              </div>
              <DataAside />
            </div>
          </div>
          <div className="col-lg-8 preview-section">
            <TablePreview cartItem={cartItem} setCartItem={setCartItem} setSearchTerm ={setSearchTerm} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
      <div className="lower-section">
        <DataCommentSection/>
      </div>
      {/* <DataFound/> */}
    </div>
  );
};

export default DataPreview;
