import React from "react";
// import authorpic from "../../../assets/images/ellipse-27-bg-vtZ.png";

const RevenueTab = () => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };
  return (
    <div className="row mt-4">
      <div className="col-lg-8">
        <div className="table-content revenuetab overflow-x-auto">
          <div className={`table-my-revenue`}>
            <div class="table-headings table-row">
              <div class="table-heading-item table-col-4">Indicator name</div>
              <div class="table-heading-item table-col-2">Data type</div>
              <div class="table-heading-item table-col-3">Gentd. Amt (N)</div>
              <div class="table-heading-item table-col-3">
                Partnership type
              </div>
            </div>
            <div className="table-body-container">
              {[...Array(10)].map((star, index) => (
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                    {truncateText("Export of goods and services", 20)}
                  </div>
                  <div class="table-body-items table-col-2">Data</div>
                  <div class="table-body-items table-col-3">{(3500).toFixed(2)}</div>
                  <div class="table-body-items table-col-3">Contributor</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTab;
