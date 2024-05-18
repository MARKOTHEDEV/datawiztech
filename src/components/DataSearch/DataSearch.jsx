import React, { useState } from "react";
import "./DataSearch.css";
import "./DataFilter.css";
import "./YearRange.css";
import "./DataFound.css";
import Header from "../Header/Header";
import { Link, useLocation } from "react-router-dom";
import ".././Header/Header.css";
import DataFound from "./DataFound";
import SearchBar from "./SearchBar";
import NotFound from "./NotFound";
import FetchSearch from "../../hooks/Search";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import SearchLoad from "./SearchLoad";

const DataSearch = () => {
  const [active, setActive] = useState("home");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [defaultText, setDefault] = useState("Let’s find that data.");
  const search = searchParams.get("searchTerm");
  
  return (
    <div>
      <Header active={active} />
      <div className="container">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="bread-items">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link to="#" className="bread-items active">
                  Data Search
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <SearchBar />
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
      <div className={`${search === "" || !search ?"container":"container-fluid"}`}>
        <SearchLoad defaultText={defaultText} search={search}/>
      </div>
    </div>
  );
};

export default DataSearch;
