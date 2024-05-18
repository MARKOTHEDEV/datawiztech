import React, { useEffect, useRef, useState } from "react";
import sort from "../../../assets/images/icons8-slider-100-1-qkV.png";
import "./AdminPayment.css";

const PaymentSearch = () => {
  const [formattedStartDate, setFormattedStartDate] = useState("mm - dd - yy");
  const dateInputRef = useRef(null);
  const handleInputFocus = (e) => {
    const inputWrapper = e.target.parentElement;
    // setInputStyle({ ...inputStyle, [e.target.id]: { backgroundColor: 'white'} });
    inputWrapper.style.borderColor = "#17b24e";
    inputWrapper.querySelector(".input__label").style.color = "#17b24e";
    // inputWrapper.querySelector(".input__icon").style.color = "#17b24e";
    e.target.setAttribute(
      "data-placeholder",
      e.target.getAttribute("placeholder")
    );
    e.target.setAttribute("placeholder", "");
  };

  const handleInputBlur = (e) => {
    const inputWrapper = e.target.parentElement;
    inputWrapper.style.borderColor = "#d8d8d8";
    inputWrapper.querySelector(".input__label").style.color = "#d8d8d8";
    // inputWrapper.querySelector(".input__icon").style.color = "#d8d8d8";
    e.target.setAttribute(
      "placeholder",
      e.target.getAttribute("data-placeholder")
    );
    e.target.setAttribute("data-placeholder", "");
  };

  const handleDateChange = (e) => {
    const rawDate = e.target.value;
    const dateObject = new Date(rawDate);
    const formattedDate = dateObject.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    setFormattedStartDate(formattedDate);
  };

  useEffect(() => {
    // Focus the hidden date input when the component renders
    if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  }, []);

  const handleVisibleInputClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  };
  const [filterBtn, setFilterBtn] = useState(false);

  const showFilter = () => {
    setFilterBtn(!filterBtn);
  };

  return (
    <div>
      <div className="search-box-container">
        <div className="datasearch-box">
          <div class="hero-input d-flex justify-content-between">
            <div className="data-search-div">
              <input type="text" class="data-search" placeholder="Search" />
            </div>
            <div class="data-search-section">Search</div>
          </div>
        </div>
        <div class="sort-container" onClick={showFilter}>
          <img class="sort-image" src={sort} alt="..." />
        </div>
      </div>
      <div className={`payment-dropdown ${filterBtn ? "active" : ""}`}>
        <div className="row">
          <div className="col-lg-3">
            <div
              className="input__wrapper emailinputcontainer mb-4"
              htmlFor="endDate"
            >
              <input
                type="date"
                className="input__field email-input d-none"
                placeholder="Start Date"
                id="endDate"
                ref={dateInputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleDateChange}
                autoComplete="off"
              />
              <input
                type="text"
                className="input__field email-input"
                // placeholder="Start Date"
                id="date"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onClick={handleVisibleInputClick}
                autoComplete="off"
                value={formattedStartDate}
                disabled
              />

              <label htmlFor="endDate" className="input__label email-label">
                Start Date
              </label>
              {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSearch;
