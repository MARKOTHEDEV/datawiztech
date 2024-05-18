import React, { useState } from "react";
import sort from "../../assets/images/icons8-slider-100-1-qkV.png";
import DataFilter from "../DataSearch/DataFilter";
import Filter from "../DataSearch/Filter";
import toast from "react-hot-toast";
import axios from "axios";
import { UserAuth } from "../../useContext/useContext";
import ActionLoader from "../Loader/ActionLoader";

const SearchFilter = ({setSearchTerm, searchTerm}) => {
  const [filterBtn, setFilterBtn] = useState(false);
  const [filter, setFilter] = useState(false);
  const { token } = UserAuth();
//   const Navigate = useNavigate();
  const [searchLoading, setSearchLoading] = useState("");

  const handleSesearchTermarch =()=>{
    setSearchTerm(searchTerm);
  }


  const handleChange = (e) => {
    setSearchTerm(e.target.value);
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
                  placeholder="Filter by country, indicator, price, source, period"
                  class="data-search"
                  value={searchTerm}
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

export default SearchFilter;
