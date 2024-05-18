import React, { useRef, useState } from "react";
import removeItem from "../../assets/images/frame-160-VgV.png";
import toast from "react-hot-toast";

const QuarterlyFillter = () => {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  // const [fromQuarter, setfromQuarter] = useState("");
  // const [toQuarter, setToQuarter] = useState("");
  // const [QuarterRange, setQuarterRange] = useState([]);
  const [countries, setCountries] = useState([]);

  // const handleFromChange = (e) => {
  //   setfromQuarter(e.target.value);
  // };

  // const handleToChange = (e) => {
  //   setToQuarter(e.target.value);
  // };

  // const handleAddRange = () => {
  //   if (!fromQuarter || !toQuarter || isNaN(fromQuarter) || isNaN(toQuarter)) {
  //     toast.error("Invalid years");
  //     return;
  //   }

  //   const start = parseInt(fromQuarter);
  //   const end = parseInt(toQuarter);
  //   if (start <= end) {
  //     const range = Array.from(
  //       { length: end - start + 1 },
  //       (_, i) => start + i
  //     );
  //     setQuarterRange(range);
  //     setfromQuarter("");
  //     setToQuarter("");
  //   } else {
  //     toast.error("Invalid year range");
  //   }
  // };

  // const handleRemoveYear = (year) => {
  //   const updatedRange = QuarterRange.filter((y) => y !== year);
  //   setQuarterRange(updatedRange);
  // };
  const handleAddCountry = () => {
    const country = document.getElementById("country").value;
    if (country.trim() !== "") {
      setCountries([...countries, country]);
      document.getElementById("country").value = "";
    }
  };

  const handleRemoveCountry = (country) => {
    const updatedCountries = countries.filter((c) => c !== country);
    setCountries(updatedCountries);
  };

  const handleAmountFocus = (e) => {
    const inputWrapper = e.target.parentElement;
    inputWrapper.style.borderColor = "#17b24e";
    inputWrapper.querySelector(".amount-input-label").style.color = "#17b24e";
    e.target.setAttribute(
      "data-placeholder",
      e.target.getAttribute("placeholder")
    );
    e.target.setAttribute("placeholder", "");
  };
  const handleInputFocus = (e) => {
    const inputWrapper = e.target.parentElement;
    // setInputStyle({ ...inputStyle, [e.target.id]: { backgroundColor: 'white'} });
    inputWrapper.style.borderColor = "#17b24e";
    inputWrapper.querySelector(".data-input-label").style.color = "#17b24e";
    // inputWrapper.querySelector(".input__icon").style.color = "#17b24e";
    e.target.setAttribute(
      "data-placeholder",
      e.target.getAttribute("placeholder")
    );
    e.target.setAttribute("placeholder", "");
  };

  const handleAmountBlur = (e) => {
    const inputWrapper = e.target.parentElement;
    inputWrapper.style.borderColor = "#d8d8d8";
    inputWrapper.querySelector(".amount-input-label").style.color = "#a7a7a7";
    // inputWrapper.querySelector(".input__icon").style.color = "#a7a7a7";
    e.target.setAttribute(
      "placeholder",
      e.target.getAttribute("data-placeholder")
    );
    e.target.setAttribute("data-placeholder", "");
  };
  const handleInputBlur = (e) => {
    const inputWrapper = e.target.parentElement;
    inputWrapper.style.borderColor = "#d8d8d8";
    inputWrapper.querySelector(".data-input-label").style.color = "#a7a7a7";
    // inputWrapper.querySelector(".input__icon").style.color = "#a7a7a7";
    e.target.setAttribute(
      "placeholder",
      e.target.getAttribute("data-placeholder")
    );
    e.target.setAttribute("data-placeholder", "");
  };

  return (
    <div>
      {/* <div className="border-container">
        <div className="filter-year-label">Select quarter(s)</div>
        <div
          className={`data-filter-border mt-3 ${
            QuarterRange.length > 0 ? "" : "py-4"
          }`}
          style={{ overflowX: "auto" }}
        >
          {QuarterRange.map((year, index) => (
            <div className="data-filter-items" key={index}>
              <div className="item-1996-QzV">{year}</div>
              <div
                className="remove-btn-container"
                onClick={() => handleRemoveYear(year)}
              >
                <img className="img-fluid" src={removeItem} alt="..." />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-4 range-content">
          <div>Your range:</div>
        </div>
        <div className="col-4 range-content">
          <div className="data-filter-input emailinputcontainer">
            <input
              type="number"
              className="data-input-field email-input"
              placeholder="Email address"
              id="from"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              value={fromQuarter}
              onChange={handleFromChange}
            />

            <label for="from" className="data-input-label">
              From
            </label>
          </div>
        </div>
        <div className="col-4 range-content">
          <div className="data-filter-input emailinputcontainer">
            <input
              type="number"
              className="data-input-field email-input"
              placeholder="Email address"
              id="to"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              value={toQuarter}
              onChange={handleToChange}
            />

            <label for="to" className="data-input-label">
              To
            </label>
          </div>
        </div>
      </div>
      <div className="year-range text-end py-2" onClick={handleAddRange}>
        Add year range
      </div> */}
      <div className="d-flex justify-content-between w-100 my-4">
        <div
          className="data-filter-input emailinputcontainer"
          style={{ width: "65%" }}
        >
          <input
            type="text"
            className="data-input-field email-input"
            placeholder="Email address"
            id="country"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            autoComplete="off"
          />

          <label for="country" className="data-input-label">
            country
          </label>
        </div>
        <div className="update-article px-2" onClick={handleAddCountry}>
          Add Country
        </div>
      </div>
      <div className="border-container">
        <div className="filter-year-label">Country(s)</div>
        <div
          className={`data-filter-border mt-3 ${
            countries.length > 0 ? "" : "py-4"
          }`}
          ref={containerRef}
          style={{ scrollLeft: scrollLeft, overflowX: "auto" }}
        >
          {countries.map((country, index) => (
            <div className="data-filter-items" key={index}>
              <div className="item-1996-QzV">{country}</div>
              <div
                className="remove-btn-container"
                onClick={() => handleRemoveCountry(country)}
              >
                <img className="img-fluid" src={removeItem} alt="..." />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="select-all-year py-3">
        <div>
          <input type="checkbox" className="all-year-check" />
        </div>
        <div className="select-text">Select all the year</div>
      </div>
      <div>
        <div className="amount-filter-input d-flex">
          <div className="px-3">
            <div className="mt-2">N</div>
          </div>
          <input
            type="number"
            className="amount-input-field email-input d-flex justify-content-end "
            placeholder="Email address"
            id="amount"
            onFocus={handleAmountFocus}
            onBlur={handleAmountBlur}
            autoComplete="off"
            style={{ width: "100%" }}
          />

          <label for="amount" className="amount-input-label">
            Amount
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuarterlyFillter;
