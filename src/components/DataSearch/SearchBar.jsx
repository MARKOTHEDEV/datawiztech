import React, { useEffect, useState } from "react";
import DataFilter from "./DataFilter";
import sort from "../../assets/images/icons8-slider-100-1-qkV.png";
import history from "../../assets/images/icon-color-tY1.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import SearchTerms from "./SearchTerms";
import ActionLoader from "../Loader/ActionLoader";

const SearchBar = () => {
  const [searchHistory, setHistory] = useState(false);
  const [filterBtn, setFilterBtn] = useState(false);
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
 
  const [url, setUrl] = useState(false);
  const Navigate = useNavigate();
  const [searchLoading, setSearchLoading] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const handleSesearchTermarch = async (e) => {
    e.preventDefault();
    if (!searchTerm || searchTerm.trim() === "") {
      toast.error("search field is empty");
      return;
    }
    setSearchParams({'searchTerm':searchTerm})
   
  };

  const chooseSearch = (terms) => {
    setSearchTerm(terms);
    Navigate(`/search?searchTerm=${terms}`);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    setHistory(!!value);
  };

  const showhistory = () => {
    if (searchTerm === "") {
      setHistory(true);
    }
  };

  const showFilter = () => {
    setFilterBtn(true);
  };
  const hideFilter = () => {
    setFilterBtn(false);
  };

  const removeHistory = () => {
    setHistory(false);
  };

  return (
    <div className="search-box-container">
      <div className="datasearch-box">
        <div className="hero-input d-flex justify-content-between">
          <div className="data-search-div">
            <input
              type="text"
              className="data-search"
              value={searchTerm}
              onChange={handleInput}
              onFocus={showhistory}
              onBlur={removeHistory}
              placeholder="Search for data..."
            />
          </div>
          <div
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
          </div>
        </div>
        {/* FetchSearchTerms */}
        {/* <SearchTerms
          history={history}
          searchHistory={searchHistory}
          chooseSearch={chooseSearch}
        /> */}
      </div>
      {url && (
        <div className="sort-container" onClick={showFilter}>
          <img className="sort-image" src={sort} alt="..." />
        </div>
      )}

      <div className={`sort-container-overlay ${filterBtn ? "open" : ""}`}>
        <DataFilter hideFilter={hideFilter} />
      </div>
    </div>
  );
};

export default SearchBar;
