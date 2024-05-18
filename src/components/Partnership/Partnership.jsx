import React, { useState } from "react";
import Header from "../Header/Header";
import "./Partnership.css";
import newpartnericon from "../../assets/images/group-Dys.png";
import PartnershipTable from "./PartnershipTable";
import { Link } from "react-router-dom";
import CoAuthtorPartnership from "./CoAuthtorPartnership";

const Partnership = () => {
  const [active, setActive] = useState("partnership")
  const [author, setAuthor] = useState(true);
  const [coAuthor, setCoAuthor] = useState(false);

  const showAuthor = () => {
    setAuthor(true);
    setCoAuthor(false);
  };

  const showCoAuthor = () => {
    setCoAuthor(true);
    setAuthor(false);
  };
  return (
    <div>
      <Header active={active}/>
      <div className="container">
        <div className="partnership-bread">Partnership Management</div>
        <div className="partnership-heading">Partnership</div>
        <div className="row">
          <div className="col-lg-5 d-flex align-items-center">
            <div className="partnership-toggle">
              <div
                className={`partnership-toggle-author ${
                  author ? "active" : ""
                }`}
                onClick={showAuthor}
              >
                Author
              </div>
              <div
                className={`partnership-toggle-co-author ${
                  coAuthor ? "active" : ""
                }`}
                onClick={showCoAuthor}
              >
                Co-author
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex justify-content-end align-content-center ">
              <div class="partnership-addnewpartner">
                <Link to="/partnership/add-partnership">
                <div class="partnership-addnewpartner-text">
                  New partnership
                </div>
                </Link>
                <img
                  class="partnership-addnew-icon"
                  src={newpartnericon}
                  alt=".."
                />
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="row overflow-hidden">
          <div className="col-lg-10">
            {author&&<PartnershipTable />}
            {coAuthor&&<CoAuthtorPartnership />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
