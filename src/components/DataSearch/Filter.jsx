import React, { useState } from "react";
import "./Filter.css";
import removeRange from "../../assets/images/group-7-mD3.png";

const Filter = ({toggleFilter}) => {
  const [dataType, setDataType] = useState(false);
  const [role, setRole] = useState(false);
  const [partnership, setPartnership] = useState(false);
  const [indicator, setIndicator] = useState(true);
  const showIndicator = () => {
    setIndicator(true);
    setDataType(false);
    setRole(false);
    setPartnership(false);
  };

  const showdataTypes = () => {
    setIndicator(false);
    setDataType(true);
    setRole(false);
    setPartnership(false);
  };

  const showRole = () => {
    setIndicator(false);
    setDataType(false);
    setRole(true);
    setPartnership(false);
  };

  const showPartnership = () => {
    setIndicator(false);
    setDataType(false);
    setRole(false);
    setPartnership(true);
  };
  return (
    <div className="filter-content container-fluid">
      <div className="">
        <div className="row ">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="filter-content-scroll position-relative">
              <div className="filter-container">
                <div className="">
                  <div className=" d-flex justify-content-end align-items-end">
                    <div class="top-title">
                      <p class="top-title-text">Filter by</p>
                      <img class="remove-range-btn" src={removeRange} alt="" onClick={toggleFilter}/>
                    </div>
                  </div>
                  <div className="filter-section">
                    <div className="d-flex column-gap-5">
                      <div className="py-5 position-relative">
                        <div className="filter-aside">
                          <div
                            className={`filter-aside-item ${
                              indicator ? "active" : ""
                            }`}
                            onClick={showIndicator}
                          >
                            Indicator
                          </div>
                          <div
                            className={`filter-aside-item ${
                              dataType ? "active" : ""
                            }`}
                            onClick={showdataTypes}
                          >
                            Data type
                          </div>
                          <div
                            className={`filter-aside-item ${
                              role ? "active" : ""
                            }`}
                            onClick={showRole}
                          >
                            Role
                          </div>
                          <div
                            className={`filter-aside-item ${
                              partnership ? "active" : ""
                            }`}
                            onClick={showPartnership}
                          >
                            Partnership type
                          </div>
                        </div>
                      </div>
                      <div className="py-5 position-relative">
                        {indicator && (
                          <div className="indicator-main">
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Export of goods and services in Nigeria</div>
                            </div>
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Export of goods and services in Nigeria</div>
                            </div>
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Export of goods and services in Nigeria</div>
                            </div>
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Export of goods and services in Nigeria</div>
                            </div>
                          </div>
                        )}
                        {dataType && (
                          <div className="indicator-main">
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Data</div>
                            </div>
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Article</div>
                            </div>
                          </div>
                        )}
                        {role && (
                          <div className="indicator-main">
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Contributor</div>
                            </div>
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Author</div>
                            </div>
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Co-author</div>
                            </div>
                          </div>
                        )}
                        {partnership && (
                          <div className="indicator-main">
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Contributor</div>
                            </div>
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Author</div>
                            </div>
                            <div className="d-flex column-gap-3 py-2">
                              <div>
                                <input
                                  className="form-check-input text-success"
                                  type="checkbox"
                                  value=""
                                  id="success-outlined"
                                />
                              </div>
                              <div>Co-author</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="filter-btn-section d-flex column-gap-3 justify-content-end">
                      <div className="filter-cancel-btn" onClick={toggleFilter}>Cancel</div>
                      <div className="filter-ok-btn">Filter</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
