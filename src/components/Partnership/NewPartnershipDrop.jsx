import React, { useState } from "react";
import authorpic from "../../assets/images/ellipse-27-bg-vtZ.png";
import cancel from "../../assets/images/frame-386-N57.png";
import { Link } from "react-router-dom";

const NewPartnershipDrop = () => {
  const [yearly, setYearly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [quarterly, setQuarterly] = useState(false);
  const [daily, setDaily] = useState(false);

  const showYearly = () => {
    setYearly(true);
    setMonthly(false);
    setQuarterly(false);
    setDaily(false);
  };
  const showMonthly = () => {
    setYearly(false);
    setMonthly(true);
    setQuarterly(false);
    setDaily(false);
  };
  const showQuarterly = () => {
    setYearly(false);
    setMonthly(false);
    setQuarterly(true);
    setDaily(false);
  };
  const showDaily = () => {
    setYearly(false);
    setMonthly(false);
    setQuarterly(false);
    setDaily(true);
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-8 d-flex align-items-center my-1">
          <div className="periodicity-sub-heading">Periodicity:</div>
          <div className="partnership-toggle">
            <div
              className={`partnership-toggle-author ${yearly ? "active" : ""}`}
              onClick={showYearly}
            >
              Yearly
            </div>
            <div
              className={`partnership-toggle-quarterly ${
                quarterly ? "active" : ""
              }`}
              onClick={showQuarterly}
            >
              Quarterly
            </div>
            <div
              className={`partnership-toggle-monthly ${
                monthly ? "active" : ""
              }`}
              onClick={showMonthly}
            >
              Monthly
            </div>
            <div
              className={`partnership-toggle-daily ${daily ? "active" : ""}`}
              onClick={showDaily}
            >
              Daily
            </div>
          </div>
        </div>

        <div className="col-lg-2"></div>
      </div>
      <div className="overflow-auto partnership-overflow-box">
        <div className="partnership-dropdown-content mt-3">
          <div className="partnership-content-flex mt-3">
            <div className="column-large-6">
              <div className="input__wrapper d-flex align-items-center mx-1">
                <div className="">
                  <img src={authorpic} alt="" className="author-pic" />
                </div>
                <div className="partnership-input-container">
                  <input
                    type="text"
                    className="partnersip_input__field"
                    id="role"
                    value="Dr. Oluwajane Ademidoe"
                    disabled
                  />
                </div>

                <label for="number" className="upload__label">
                  Co-author 1
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  // type="email"
                  className="partnersip_input__field"
                  // placeholder="Email address"
                  id="role"
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                  autoComplete="off"
                >
                  <option>Co Author</option>
                  <option>Author</option>
                  <option>Amount</option>
                </select>
                <label for="role" className="input__label email-label">
                  Role
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  // type="email"
                  className="partnersip_input__field"
                  // placeholder="Email address"
                  id="percentage"
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                  autoComplete="off"
                >
                  <option>10%</option>
                  <option>20%</option>
                  <option>30%</option>
                </select>
                <label for="percentage" className="input__label email-label">
                  percentage
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="partnership-remove-self">Remove self</div>
          </div>
          <div className="partnership-content-flex mt-1">
            <div className="column-large-6">
              <div className="input__wrapper d-flex align-items-center mx-1">
                <div className="">
                  <img src={authorpic} alt="" className="author-pic" />
                </div>
                <div className="partnership-input-container">
                  <input
                    type="text"
                    className="partnersip_input__field"
                    id="role"
                    value="Dr. Oluwajane Ademidoe"
                    disabled
                  />
                </div>

                <label for="number" className="upload__label">
                  Co-author 1
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  // type="email"
                  className="partnersip_input__field"
                  // placeholder="Email address"
                  id="role"
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                  autoComplete="off"
                >
                  <option>Co Author</option>
                  <option>Author</option>
                  <option>Amount</option>
                </select>
                <label for="role" className="input__label email-label">
                  Role
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  // type="email"
                  className="partnersip_input__field"
                  // placeholder="Email address"
                  id="percentage"
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                  autoComplete="off"
                >
                  <option>10%</option>
                  <option>20%</option>
                  <option>30%</option>
                </select>
                <label for="percentage" className="input__label email-label">
                  percentage
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="partnership-pending">Pending</div>
          </div>
          <div className="partnership-content-flex mt-1">
            <div className="column-large-6">
              <div className="input__wrapper d-flex align-items-center mx-1">
                <div className="">
                  <img src={authorpic} alt="" className="author-pic" />
                </div>
                <div className="partnership-input-container">
                  <input
                    type="text"
                    className="partnersip_input__field"
                    id="role"
                    value="Dr. Oluwajane Ademidoe"
                    disabled
                  />
                </div>

                <label for="number" className="upload__label">
                  Co-author 1
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  // type="email"
                  className="partnersip_input__field"
                  // placeholder="Email address"
                  id="role"
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                  autoComplete="off"
                >
                  <option>Co Author</option>
                  <option>Author</option>
                  <option>Amount</option>
                </select>
                <label for="role" className="input__label email-label">
                  Role
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  // type="email"
                  className="partnersip_input__field"
                  // placeholder="Email address"
                  id="percentage"
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                  autoComplete="off"
                >
                  <option>10%</option>
                  <option>20%</option>
                  <option>30%</option>
                </select>
                <label for="percentage" className="input__label email-label">
                  percentage
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div class="partnership-accepted-container">
              <div class="partnership-accepted">Accepted</div>
              <img class="partnership-accepted-remove" src={cancel} alt=".." />
            </div>
          </div>
          <div className="partnership-content-flex mt-1">
            <div className="column-large-6">
              <div className="input__wrapper d-flex align-items-center mx-1">
                <div className="">
                  <img src={authorpic} alt="" className="author-pic" />
                </div>
                <div className="partnership-input-container">
                  <input
                    type="text"
                    className="partnersip_input__field"
                    id="role"
                    value="Dr. Oluwajane Ademidoe"
                    disabled
                  />
                </div>

                <label for="number" className="upload__label">
                  Co-author 1
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  // type="email"
                  className="partnersip_input__field"
                  // placeholder="Email address"
                  id="role"
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                  autoComplete="off"
                >
                  <option>Co Author</option>
                  <option>Author</option>
                  <option>Amount</option>
                </select>
                <label for="role" className="input__label email-label">
                  Role
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  // type="email"
                  className="partnersip_input__field"
                  // placeholder="Email address"
                  id="percentage"
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                  autoComplete="off"
                >
                  <option>10%</option>
                  <option>20%</option>
                  <option>30%</option>
                </select>
                <label for="percentage" className="input__label email-label">
                  percentage
                </label>
                {/* <!-- <i className="fa-solid fa-eye input__icon"></i> --> */}
              </div>
            </div>
            <div class="partnership-accepted-container">
              <div class="partnership-declined">Declined</div>
              <img class="partnership-accepted-remove" src={cancel} alt=".." />
            </div>
          </div>
        </div>
      </div>
      <Link to="/partnership/add-partnership">
        <div className="add-another-author">Add another author</div>
      </Link>
      <div className="row my-4">
        <div className="col-lg-7">
          <div class="newpartnership-btn">Save partnership</div>
        </div>
      </div>
    </div>
  );
};

export default NewPartnershipDrop;
