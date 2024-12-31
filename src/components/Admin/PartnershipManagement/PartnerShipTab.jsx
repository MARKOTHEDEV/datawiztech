import React from "react";
import authorpic from "../../../assets/images/ellipse-27-bg-vtZ.png";

const PartnerShipTab = () => {
  return (
    <div>
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
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  className="partnersip_input__field"
                  id="role"
                  autoComplete="off"
                >
                  <option>Co Author</option>
                  <option>Author</option>
                  <option>Amount</option>
                </select>
                <label for="role" className="input__label email-label">
                  Role
                </label>
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <input
                  type="number"
                  className="partnersip_input__field"
                  id="percentage"
                  autoComplete="off"
                />
                <label for="percentage" className="input__label email-label">
                  percentage
                </label>
              </div>
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
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <select
                  className="partnersip_input__field"
                  id="role"
                  autoComplete="off"
                >
                  <option>Co Author</option>
                  <option>Author</option>
                  <option>Amount</option>
                </select>
                <label for="role" className="input__label email-label">
                  Role
                </label>
              </div>
            </div>
            <div className="column-large-3">
              <div className="input__wrapper mb-4">
                <input
                  type="number"
                  className="partnersip_input__field"
                  id="percentage"
                  autoComplete="off"
                />
                <label for="percentage" className="input__label email-label">
                  percentage
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="add-another-author py-lg-0 py-4">Add co-author</div>
      <div className="row my-4">
        <div className="col-lg-5 my-5">
          <div class="newpartnership-btn">Update partnership</div>
        </div>
      </div>
    </div>
  );
};

export default PartnerShipTab;
