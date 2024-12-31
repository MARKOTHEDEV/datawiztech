import React, { useEffect, useRef, useState } from "react";
import cancelbtn from "../../../assets/images/group-7-mD3.png";
import removeItem from "../../../assets/images/frame-160-VgV.png";

const CorperateFilter = ({hideFilter}) => {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const scrollableWidth =
          containerRef.current.scrollWidth - containerWidth;
        const percentage = (e.clientX / containerWidth) * 100;
        const newScrollLeft = (percentage / 100) * scrollableWidth;
        setScrollLeft(newScrollLeft);
      }
    };

    const container = containerRef.current;

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
    <div className="filter-content container-fluid">
      <div className="">
        <div className="row ">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <div className="filter-content-scroll">
              <div className="filter-container">
                <div class="filter-header">
                  <div className="d-flex justify-content-end ">
                    <p class="filter-heading">Select data</p>
                    <p className="filter-cancel-btn-container" onClick={hideFilter}>
                      <img
                        class="filter-cancel-btn img-fluid "
                        src={cancelbtn}
                        alt=".."
                      />
                    </p>
                  </div>
                  <p class="filter-sub-heading">
                    Here, you can chose what data you want by country and year
                  </p>
                </div>
                <div class="row">
                  <div class="col-3 text-center filter-switch active pb-1">
                    Yearly
                  </div>
                  <div class="col-3 text-center filter-switch pb-1">
                    Quarterly
                  </div>
                  <div class="col-3 text-center filter-switch pb-1">
                    Monthly
                  </div>
                  <div class="col-3 text-center filter-switch pb-1">Daily</div>
                </div>
                <div className="border-container">
                  <div className="filter-year-label">Select year(s)</div>
                  <div
                    className="data-filter-border mt-3"
                    ref={containerRef}
                    style={{ scrollLeft: scrollLeft, overflowX: "scroll" }}
                  >
                    {[...Array(10)].map((_, index) => (
                      <div className="data-filter-items" key={index}>
                        <div class="item-1996-QzV">1996</div>
                        <div className="remove-btn-container">
                          <img class="img-fluid" src={removeItem} alt="..." />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div class="line-part pt-3">
                  <div class="lineA"></div>
                  <p class="or-text">OR</p>
                  <div class="lineA"></div>
                </div>
                <div className="row">
                  <div className="col-4 range-content">
                    <div>Your range:</div>
                  </div>
                  <div className="col-4 range-content">
                    <div className="data-filter-input emailinputcontainer">
                      <input // type="email"
                        className="data-input-field email-input"
                        placeholder="Email address"
                        id="from"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        autoComplete="off"
                      />

                      <label for="from" className="data-input-label">
                        From
                      </label>
                    </div>
                  </div>
                  <div className="col-4 range-content">
                    <div className="data-filter-input emailinputcontainer">
                      <input // type="email"
                        className="data-input-field email-input"
                        placeholder="Email address"
                        id="to"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        autoComplete="off"
                      />

                      <label for="to" className="data-input-label">
                        To
                      </label>
                    </div>
                  </div>
                </div>
                <div className="year-range text-end py-2">Add year range</div>
                <div className="border-container">
                  <div className="filter-year-label">Country(s)</div>
                  <div
                    className="data-filter-border mt-3"
                    ref={containerRef}
                    style={{ scrollLeft: scrollLeft, overflowX: "scroll" }}
                  >
                    {[...Array(10)].map((_, index) => (
                      <div className="data-filter-items" key={index}>
                        <div class="item-1996-QzV">Nigeria</div>
                        <div className="remove-btn-container">
                          <img class="img-fluid" src={removeItem} alt="..." />
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
                    <input // type="email"
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

export default CorperateFilter;
