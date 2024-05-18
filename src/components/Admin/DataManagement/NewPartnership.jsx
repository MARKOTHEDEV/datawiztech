import React, { useState } from "react";
import "./NewPartnership.css";
import PartnerShipTab from "./PartnerShipTab";
import RevenueTab from "./RevenueTab";
import AnalysisTab from "./AnalysisTab";
import sort from "../../../assets/images/icons8-slider-100-1-qkV.png";


const NewPartnership = ({openSide}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCountryClick = (index) => {
    setActiveIndex(index);
  };
  const partnershipTab = ["Partnership", "Revenue", "Analysis"];
  const partnershipTabContent = [
    <PartnerShipTab key="partnershipTab" />,
    <RevenueTab key="revenueTab" />,
    <AnalysisTab key="analysisTab" openSide={openSide}/>,
  ];

  return (
    <div>
      <div className="partners-countries-container">
        <div className="row">
          <div className="col-lg-9">
          <div className="search-box-container">
      <div className="datasearch-box">
        <div class="hero-input d-flex justify-content-between">
          <div className="data-search-div">
            <input
              type="text"
              class="data-search"
              placeholder="Search by indicator name"
            />
          </div>
          <div class="data-search-section">Search</div>
        </div>
       
      </div>
      <div class="sort-container" >
        <img class="sort-image" src={sort} alt="..." />
      </div>
    </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="partners-countries px-2 pt-4">
              {partnershipTab.map((tab, index) => (
                <div
                  key={index}
                  className={`partners-tab-name ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleCountryClick(index)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {partnershipTabContent[activeIndex]}
    </div>
  );
};

export default NewPartnership;
