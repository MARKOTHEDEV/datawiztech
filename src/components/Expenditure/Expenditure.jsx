import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import MyExpenditure from "./MyExpenditure";
import Analysis from "./Analysis";
import "./Expenditure.css";
import "./MyExpenditure.css";
// import "./PartnershipExpenditure.css"
import "./Analysis.css"
import "../Header/Header.css"
// import PartnershipExpenditure from "./PartnershipExpenditure";



const Expenditure = () => {
  const [Expenditure, setExpenditure] = useState("Expenditure History");
  const [myExpenditure, setMyExpenditure] = useState(true);
  const [container, setContainer] = useState(true);
//   const [patnershipExpenditure, setPatnershipExpenditure] = useState(false);
  const [analysis, setAnalysis] = useState(false);

  const toggleMyExpenditure = () => {
    setContainer(true);
    setExpenditure("Expenditure History");
    setMyExpenditure(true);
    // setPatnershipExpenditure(false);
    setAnalysis(false);
  };

//   const togglePatnership = () => {
//     setContainer(false);
//     setExpenditure("Patnership Expenditure");
//     // setPatnershipExpenditure(true);
//     setMyExpenditure(false);
//     setAnalysis(false);
//   };

  const toggleAnalysis = () => {
    setContainer(true);
    setExpenditure("Analysis");
    setAnalysis(true);
    setMyExpenditure(false);
    // setPatnershipExpenditure(false);
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
                    Expenditure History
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
          <div>
            <h1 className="expenditure-heading">{Expenditure}</h1>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="row mx-1">
                <div
                  className={`col-4 text-center expenditure-btn ${
                    myExpenditure ? "active" : ""
                  }`}
                  onClick={toggleMyExpenditure}
                >
                  My Expenditure
                </div>
                <div
                  className={`col-4 text-center expenditure-btn ${
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
          <div className={`expenditure-section ${myExpenditure ? "active" : ""}`}>
            <MyExpenditure myExpenditure={myExpenditure} />
          </div>
          <div className={`expenditure-section ${analysis ? "active" : ""}`}>
            <Analysis analysis={analysis} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenditure
