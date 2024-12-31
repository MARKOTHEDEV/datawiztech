import React from "react";
import searchIcon from "../../../assets/images/frame-1-txZ.png";

const Find = () => {
  return (
    <div class="container-fluid find-section">
      <div class="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 py-5">
            <p class="text-center find-section-title">
              Find all the data you need today.
            </p>

            <p class="push-text">
              <p class="find-section-text text-center">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
            </p>
            <div class="begin-search-container">
              <div class="begin-search-btn px-4">
                <p class="text-center begin-search mt-2">
                  Let’s begin the search
                </p>
                <p>
                  <img
                    class="begin-search-icon mt-2"
                    src={searchIcon}
                    alt="..."
                  />
                </p>
              </div>
            </div>
            <div class="auto-group-afl5-dMB-bg"></div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default Find;
