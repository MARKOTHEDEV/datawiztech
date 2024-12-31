import React, { useState } from "react";
import Header from "../Header/Header";
import "./Partnership.css";
import remove from "../../assets/images/group-9620-Sad.png";
import  "./NewPartnership.css";
import cartimage from "../../assets/images/rectangle-39-xzm.png";

import NewPartnershipDrop from "./NewPartnershipDrop";

const NewPartnership = () => {
  const [active, setActive] = useState("partnership");
  
  return (
    <div>
      <Header active={active} />
      <div className="container">
        <div className="partnership-bread">Partnership Management</div>
        <div className="partnership-heading">New Partnership</div>
        <div className="row">
          <div className="col-lg-8 my-3">
            <div class="hero-input d-flex justify-content-between">
              <div className="data-search-div">
                <input
                  type="text"
                  class="data-search"
                  //   onFocus={showhistory}
                  //   onBlur={removeHistory}
                />
              </div>
              <div class="data-search-section">Search</div>
            </div>
          </div>
        </div>

       
        <div className="row">
          <div className="col-lg-9 my-3">
            <div className="d-flex align-items-center justify-content-between ">
              <div className="partnership-title-box">
                <div>
                  <img
                    className="partnership-item-image"
                    src={cartimage}
                    alt=".."
                  />
                </div>
                <div className="partnership-item-title">
                  Export good and services
                </div>
              </div>
              <div className="partnership-item-type">Data</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 my-3">
          <div className="partner-notif">
          <img className="notif-icon" src={remove} alt='.'/>
          <div className="notif-text">Kindly note that authors added will subsequently recieve payment based on data sales </div>
        </div>
          </div>
        </div>
        
        <div className="row overflow-hidden">
          <div className="col-lg-10">
            <NewPartnershipDrop/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPartnership;
