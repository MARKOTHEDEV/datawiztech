import React, {useState} from "react";
import "./AdminSearchHistory.css";
import admincountpic from "../../../assets/images/ellipse-28-bg-nDF.png";
import SearchTableContent from "./SearchTableContent";

const AdminSearchHistory = () => {
  const [search, setSearch] = useState("")
  const handleChange = (value)=>{
    const term = value
    setSearch(term)
  }
  return (
    <div>
      <div className="row mb-3">
        <div className="col-lg-8">
        <div className="search-box-container">
      <div className="datasearch-box">
        <div class="hero-input d-flex justify-content-between">
          <div className="data-search-div">
            <input
              type="text"
              class="data-search"
              placeholder="Search"
              value= {search}
              onChange={(e)=>{handleChange(e.target.value)}}
            />
          </div>
          <div class="data-search-section">Search</div>
        </div>
        
      </div>
    </div>
        </div>
      </div>
      <div className="adminsearchhistory">
        <div className="adminsearchhistorytable">
          <div className="admin-search-history-heading">
            <div className="admin-search-items">Search terms</div>
            <div className="admin-search-count">Search term count</div>
            <div className="admin-search-user">No of users who searched</div>
          </div>
          <SearchTableContent searchTerm={search} />
        </div>
      </div>
    </div>
  );
};

export default AdminSearchHistory;
