import React, { useState } from "react";
import "./Charts.css";
import BarCharts from "./BarCharts";
import LineChart from "./LineChart";

const Charts = ({openSide, analysis}) => {
  const [isLeft, setIsLeft] = useState(true);

  const handleToggle = () => {
    setIsLeft(!isLeft);
  };

  

  return (
    <div className="w-100 overflow-hidden">
      <div className="p-2">
        <div className="w-100 d-flex align-items-center justify-content-lg-end justify-content-center">
          <div className="pb-5 chart-headings ">
            <div className="chart-legends">
              <div className="chart-legend-text">Data Sold</div>
              <div className="data-sold-legend"></div>
            </div>
            <div className="chart-legends">
              <div className="chart-legend-text">Data Bought</div>
              <div className="data-bought-legend"></div>
            </div>
            <div className="chart-legends">
              <div className="chart-type">Line graph</div>
              <div className={`toggle-container ${isLeft ? "left" : "right"}`}>
                <input
                  type="checkbox"
                  id="toggle"
                  className="toggle-btn"
                  checked={isLeft}
                  onChange={handleToggle}
                />
                <label
                  className={`toggle-slider ${isLeft ? "left" : "right"}`}
                  htmlFor="toggle"
                ></label>
              </div>
              <div className="chart-type">Bar chart</div>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container">
      {isLeft ? <LineChart openSide={openSide} analysis={analysis} /> : <BarCharts openSide={openSide} analysis={analysis} />}
      </div>
    </div>
  );
};

export default Charts;
