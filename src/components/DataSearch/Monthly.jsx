import React, { useRef, useState } from "react";
import removeItem from "../../assets/images/frame-160-VgV.png";
import toast from "react-hot-toast";

const MonthlyFillter = () => {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  // const [fromMonth, setFromMonth] = useState("");
  // const [toMonth, setToMonth] = useState("");
  // const [monthRange, setMonthRange] = useState([]);
  const [countries, setCountries] = useState([]);

  // const handleFromChange = (e) => {
  //   setFromMonth(e.target.value);
  // };

  // const handleToChange = (e) => {
  //   setToMonth(e.target.value);
  // };

  // const handleAddRange = () => {
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  //   const start = months.indexOf(fromMonth) + 1;
  //   const end = months.indexOf(toMonth) + 1;

  //   if (start <= end) {
  //     let range = [];
  //     for (let year = start; year <= end; year++) {
  //       for (let month = 1; month <= 12; month++) {
  //         if (year === end && month > months.indexOf(toMonth) + 1) {
  //           break;
  //         }
  //         range.push(`${year}-${months[month - 1]}`);
  //       }
  //     }
  //     setMonthRange(range);
  //     setFromMonth("");
  //     setToMonth("");
  //   } else {
  //     toast.error("Invalid month range");
  //   }
  // };

  // const handleRemoveMonth = (month) => {
  //   const updatedRange = monthRange.filter((m) => m !== month);
  //   setMonthRange(updatedRange);
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
    inputWrapper.style.borderColor = "#17b24e";
    inputWrapper.querySelector(".data-input-label").style.color = "#17b24e";
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
    e.target.setAttribute(
      "placeholder",
      e.target.getAttribute("data-placeholder")
    );
    e.target.setAttribute("data-placeholder", "");
  };

  return (
    <div>
      {/* <div className="border-container">
        <div className="filter-year-label">Select month(s)</div>
        <div
          className={`data-filter-border mt-3 ${
            monthRange.length > 0 ? "" : "py-4"
          }`}
          style={{ overflowX: "auto" }}
        >
          {monthRange.map((month, index) => (
            <div className="data-filter-items" key={index}>
              <div className="item-1996-QzV">{month}</div>
              <div
                className="remove-btn-container"
                onClick={() => handleRemoveMonth(month)}
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
              type="text"
              className="data-input-field email-input"
              placeholder="Email address"
              id="from"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              value={fromMonth}
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
              type="text"
              className="data-input-field email-input"
              placeholder="Email address"
              id="to"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              value={toMonth}
              onChange={handleToChange}
            />

            <label for="to" className="data-input-label">
              To
            </label>
          </div>
        </div>
      </div>
      <div className="year-range text-end py-2" onClick={handleAddRange}>
        Add month range
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
        <div className="select-text">Select all the months</div>
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

export default MonthlyFillter;
