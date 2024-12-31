import React from "react";
import removeRange from "../../assets/images/group-7-mD3.png";

const FilterBy = () => {
  return (
    <div className="filter-content container-fluid">
      <div className="">
        <div className="row ">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <div className="filter-content-scroll">
              <div className="filter-container">
                <div className=" d-flex justify-content-end align-items-end">
                  <div class="top-title">
                    <p class="top-title-text">Filter by</p>
                    <img class="remove-range-btn" src={removeRange} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </div>
  );
};

export default FilterBy;
