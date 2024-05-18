import React from "react";
import middleimage from "../../assets/images/undrawfilesearchingduff-1-Hyj.png";

const NotFound = ({ defaultText }) => {
  return (
    <div className="overflow-x-hidden">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <img class="img-thumbnail border-0" src={middleimage} alt="..." />
        </div>
        <div className="col-lg-3"></div>
      </div>
      <p class="find-data-p my-5 ">{defaultText || "Let’s find that data."}</p>
    </div>
  );
};

export default NotFound;
