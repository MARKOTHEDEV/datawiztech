import React, { useEffect, useRef, useState } from "react";
import cancelbtn from "../../assets/images/group-7-mD3.png";
import removeItem from "../../assets/images/frame-160-VgV.png";
import toast from "react-hot-toast";
import YearlyFillter from "./YearlyFillter";
import DailyFillter from "./DailyFilter";
import QuarterlyFillter from "./QuarterlyFilter";
import MonthlyFillter from "./Monthly";
import removeRange from "../../assets/images/group-7-mD3.png";

const DataFilter = ({ hideFilter }) => {
  // const [year, setYear] = useState(true)
  // const [quarter, setQuarter] = useState(false)
  // const [monthly, setMonthly] = useState(false)
  // const [daily, setDaily] = useState(false)

  // const showYear = () =>{
  //   setYear(true)
  //   setQuarter(false)
  //   setMonthly(false)
  //   setDaily(false)
  // }

  // const showQuarter = () =>{
  //   setYear(false)
  //   setQuarter(true)
  //   setMonthly(false)
  //   setDaily(false)
  // }

  // const showMonth = () =>{
  //   setYear(false)
  //   setQuarter(false)
  //   setMonthly(true)
  //   setDaily(false)
  // }

  // const showDay = () =>{
  //   setYear(false)
  //   setQuarter(false)
  //   setMonthly(false)
  //   setDaily(true)
  // }

  return (
    <div className="filter-content container-fluid">
      <div className="">
        <div className="row ">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <div className="filter-content-scroll position-relative">
              <div className="filter-container">
                <div class="filter-header">
                  <div className="d-flex justify-content-end ">
                    <p class="filter-heading">Select data</p>
                    <p className="filter-cancel-container" onClick={hideFilter}>
                      <img
                        // class="filter-cancel-btn"
                        className="img-fluid"
                        src={removeRange}
                        alt=".."
                      />
                    </p>
                  </div>
                  <p class="filter-sub-heading">
                    Here, you can chose what data you want by country and year
                  </p>
                </div>
                {/* <div class="row">
                  <div class={`col-3 text-center filter-switch pb-1 ${year?"active":""}`}
                  onClick={showYear}>
                    Yearly
                  </div>
                  <div class={`col-3 text-center filter-switch pb-1 ${quarter?"active":""}`}
                  onClick={showQuarter}>
                    Quarterly
                  </div>
                  <div class={`col-3 text-center filter-switch pb-1 ${monthly?"active":""}`}
                  onClick={showMonth}>
                    Monthly
                  </div>
                  <div class={`col-3 text-center filter-switch pb-1 ${daily?"active":""}`}
                  onClick={showDay}>Daily</div>
                </div> */}
                <YearlyFillter />
                {/* {quarter&&<QuarterlyFillter/>}
                {monthly&&<MonthlyFillter/>}
                {daily&&<DailyFillter/>} */}
                <div class="data-filter-btn mt-4 py-3">Add to cart</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </div>
  );
};

export default DataFilter;
