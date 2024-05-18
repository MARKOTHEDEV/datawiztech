import React, { useEffect, useRef, useState } from "react";
import Charts from "../Charts/Charts";

const Analysis = ({ analysis, openSide }) => {
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

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-lg-4 d-flex" style={{ gap: "15px" }}>
          <div
            className="input__wrapper emailinputcontainer mb-4"
            htmlFor="startDate"
          >
            <input
              type="date"
              className="input__field email-input d-none"
              placeholder="Start Date"
              id="startDate"
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

            <label htmlFor="startDate" className="input__label email-label">
              Start Date
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
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
        <div className="col-lg-4 d-flex" style={{ gap: "15px" }}>
          <div className="input__wrapper emailinputcontainer mb-4">
            <select
              // type="email"
              className="input__field email-input"
              // placeholder="Email address"
              id="email"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
            >
              <option>Data</option>
              <option>Amount</option>
            </select>
            <label for="email" className="input__label email-label">
              Show by
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
          <div className="input__wrapper emailinputcontainer mb-4">
            <input
              type="number"
              className="input__field email-input "
              placeholder="Total revenue (N)"
              id="sortNumber"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
              value="7200"
            />
            <label for="sortNumber" className="input__label email-label">
              Total revenue (N)
            </label>
            {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="searchContainer d-flex justify-content-between ">
            <input
              type="text"
              className="searchInput"
              placeholder="Search by indicator name"
            />
            <div className="searchBtn">Search</div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-10">
          <div className="table-container-bg">
            <div className="table-content mb-4 py-2 px-lg-2 px-1">
              <Charts openSide={openSide} />
            </div>
            <div className="table-content overflow-x-auto">
              <div
                className={`${analysis ? "table-my-revenue" : "table-inner"}`}
              >
                <div class="table-headings table-row">
                  <div class="table-heading-item table-col-2">Date</div>
                  <div class="table-heading-item table-col-4">
                    Indicator name
                  </div>
                  <div class="table-heading-item table-col-3">Data type</div>
                  <div class="table-heading-item table-col-3">
                    My revenue (N)
                  </div>
                </div>
                <div className="table-body-container">
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">Data</div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">
                      Article/Write-Up
                    </div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">Data</div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">
                      Article/Write-Up
                    </div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">Data</div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">
                      Article/Write-Up
                    </div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">Data</div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">
                      Article/Write-Up
                    </div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">Data</div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-2">
                      02 - 07 - 2020
                    </div>
                    <div class="table-body-items table-col-4">
                      Export of goods and services
                    </div>
                    <div class="table-body-items table-col-3">
                      Article/Write-Up
                    </div>
                    <div class="table-body-items table-col-3">3,500.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
