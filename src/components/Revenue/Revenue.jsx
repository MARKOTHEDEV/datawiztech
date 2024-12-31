import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import MyRevenue from "./MyRevenue";
import Analysis from "./Analysis";
import "./Revenue.css";
import "./MyRevenue.css";
import "./PartnershipRevenue.css"
import "./Analysis.css"
import "../Header/Header.css"
import PartnershipRevenue from "./PartnershipRevenue";



const Revenue = () => {
  const [revenue, setRevenue] = useState("Revenue History");
  const [myRevenue, setMyRevenue] = useState(true);
  const [container, setContainer] = useState(true);
  const [patnershipRevenue, setPatnershipRevenue] = useState(false);
  const [analysis, setAnalysis] = useState(false);

  const toggleMyRevenue = () => {
    setContainer(true);
    setRevenue("Revenue History");
    setMyRevenue(true);
    setPatnershipRevenue(false);
    setAnalysis(false);
  };

  const togglePatnership = () => {
    setContainer(false);
    setRevenue("Patnership Revenue");
    setPatnershipRevenue(true);
    setMyRevenue(false);
    setAnalysis(false);
  };

  const toggleAnalysis = () => {
    setContainer(true);
    setRevenue("Analysis");
    setAnalysis(true);
    setMyRevenue(false);
    setPatnershipRevenue(false);
  };
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="container">
          <div>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/" className="bread-items">
                    Home
                  </Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to="/profile" className="bread-items">
                    Profile
                  </Link>
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <Link to="#" className="bread-items active">
                    Revenue History
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
          <div>
            <h1 className="revenue-heading">{revenue}</h1>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="row mx-1">
                <div
                  className={`col-4 text-center revenue-btn ${
                    myRevenue ? "active" : ""
                  }`}
                  onClick={toggleMyRevenue}
                >
                  My Revenue
                </div>
                <div
                  className={`col-4 text-center revenue-btn ${
                    patnershipRevenue ? "active" : ""
                  }`}
                  onClick={togglePatnership}
                >
                  Partnership reveune
                </div>
                <div
                  className={`col-4 text-center revenue-btn ${
                    analysis ? "active" : ""
                  }`}
                  onClick={toggleAnalysis}
                >
                  Analysis
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${container? "container": "container-fluid"}`}>
          <div className={`revenue-section ${myRevenue ? "active" : ""}`}>
            <MyRevenue myRevenue={myRevenue} />
          </div>
          <div className={`revenue-section ${patnershipRevenue ? "active" : ""}`}>
            <PartnershipRevenue PatnershipRevenue={patnershipRevenue} />
          </div>
          <div className={`revenue-section ${analysis ? "active" : ""}`}>
            <Analysis analysis={analysis} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
