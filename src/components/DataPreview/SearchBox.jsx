import React, { useState } from "react";
import history from "../../assets/images/icon-color-tY1.png";
import sort from "../../assets/images/icons8-slider-100-1-qkV.png";
import DataFilter from "../DataSearch/DataFilter";
import FilterBy from "./FilterBy";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../DataSearch/Filter";
import toast from "react-hot-toast";
import axios from "axios";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";
import SearchTerms from "../DataSearch/SearchTerms";

const SearchBox = () => {
  const [searchHistory, setHistory] = useState(false);
  const [filterBtn, setFilterBtn] = useState(false);
  const [filter, setFilter] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );

  const { token } = UserAuth();
  const Navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState("");

  const handleSesearchTermarch = async (e) => {
    e.preventDefault();
    if (!search || search.trim() === "") {
      toast.error("search field is empty");
      return;
    }
    setSearchLoading(true);
    try {
      const response = await axios.post("https://datawiztechapi.onrender.com/api/v1/search", {
        search: search,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setSearchTerm(searchTerm);
        Navigate(`/search?searchTerm=${search}`);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log("Error uploading article:", err);
      if (err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error occur !");
      }
    } finally {
      setSearchLoading(false);
    }
  };
  const chooseSearch = (terms) => {
    setSearchTerm(terms);
    Navigate(`/search?searchTerm=${terms}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const showhistory = () => {
    setHistory(true);
  };

  const showFilter = () => {
    setFilterBtn(true);
  };
  const hideFilter = () => {
    setFilterBtn(false);
  };
  const toggleFilter = () => {
    setFilter(!filter);
    setFilterBtn(!filterBtn)
  };

  const removeHistory = () => {
    setHistory(false);
  };
  return (
    <div>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 search-box-container">
          <div className="datasearch-box">
            <div class="hero-input d-flex justify-content-between">
              <div className="data-search-div">
                <input
                  type="text"
                  class="data-search"
                  onFocus={showhistory}
                  onBlur={removeHistory}
                  value={search}
                  onChange={handleChange}
                />
              </div>
              <div
                class={`data-search-section ${
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
            <SearchTerms
              history={history}
              searchHistory={searchHistory}
              chooseSearch={chooseSearch}
            />
          </div>
          <div class="sort-container" onClick={showFilter}>
            <img class="sort-image" src={sort} alt="..." />
          </div>
        </div>
        <div className="col-lg-2"></div>
      </div>
      <div className={`sort-container-overlay ${filterBtn ? "open" : ""}`}>
        <DataFilter hideFilter={hideFilter} />
      </div>
      <div className={`filter-container-overlay ${filter ? "open" : ""}`}>
        <Filter toggleFilter={toggleFilter} />
      </div>
    </div>
  );
};

export default SearchBox;
