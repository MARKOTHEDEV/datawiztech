import React, {useState} from "react";
import "./PartnershipManagement.css";
import newpartner from "../../../assets/images/group-Dys.png";
import { Link } from "react-router-dom";
import PartnerShipContent from "./PartnerShipContent";
import toast from "react-hot-toast"

const PartnershipManagement = () => {
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
        <div className="col-lg-4 d-flex justify-content-lg-end align-items-center my-lg-0 my-3">
         <Link to='/admin/new-partnership'>
         <div class="admin-new-partnership">
            <div class="admin-new-partnership-text">New partnership</div>
            <img class="admin-new-partnership-icon" src={newpartner} alt="" />
          </div>
         </Link>
        </div>
      </div>
      <PartnerShipContent searchTerm={search}/>
    </div>
  );
};

export default PartnershipManagement;
