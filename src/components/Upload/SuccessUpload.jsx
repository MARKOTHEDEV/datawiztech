import React from "react";
import "./SuccessUpload.css";
import movingman from "../../assets/images/open-doodles.png";
import { Link } from "react-router-dom";

const SuccessUpload = () => {
  return (
    <div className="success-data-upload">
      <div className="row w-100">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div class="success-container">
            <div class="group-16-MrH">
              <p class="data-upload-successful">Data upload successful</p>
              <div className="w-100 d-flex justify-content-center align-items-center py-3">
              <img class="img-fluid success-upload-image" src={movingman} alt=".." />
              </div>
              <p class="data-uploaded-text pt-4">
                Your data has been uploaded successfully.
              </p>
              <Link to="/" class="got-to-homepage">Go to homepage</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default SuccessUpload;
