import React, { useEffect, useRef, useState } from "react";
import cancelbtn from "../../assets/images/group-7-mD3.png";


const YearRange = () => {
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
    <div className="range-content container-fluid">
    <div className="">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div>
            <div className="range-container">
              <div class="range-header"> 
                <div className="d-flex justify-content-end ">
                  <p class="range-heading">Select data</p>
                  <p className="range-cancel-btn-container">
                    <img
                      class="range-cancel-btn img-fluid "
                      src={cancelbtn}
                      alt=".."
                    />
                  </p>
                </div>
                <p class="range-sub-heading">
                  Here, you can chose what data you want by country and year
                </p>
              </div>
             
            </div>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  </div>
  )
}

export default YearRange
