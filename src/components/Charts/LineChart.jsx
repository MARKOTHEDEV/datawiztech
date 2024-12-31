import React from "react";
import { Chart } from "react-google-charts";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import RevenueExpenditure from "../../hooks/RevenueExpenditure";

export const lineData = [
  ["Year", "Sales", { role: "style" }, "Expenses", { role: "style" }],
  ["2004", 0, "#4eb473", 0, "red"],
  ["2005", 1170, "#4eb473", 460, "red"],
  ["2006", 660, "#4eb473", 1120, "red"],
  ["2007", 1030, "#4eb473", 540, "red"],
  ["2008", 1030, "#4eb473", 540, "red"],
  ["2009", 1030, "#4eb473", 540, "red"],
  ["2010", 1030, "#4eb473", 540, "red"],
  ["2011", 1030, "#4eb473", 540, "red"],
  ["2012", 1030, "#4eb473", 540, "red"],
];

export const emptyData = [
  ["Day", "Revenue", { role: "style" }, "Expenditure", { role: "style" }],
  ["Mon", 0, "#4eb473", 0, "red"],
  ["Tues", 0, "#4eb473", 0, "red"],
  ["Wed", 0, "#4eb473", 0, "red"],
  ["Thur", 0, "#4eb473", 0, "red"],
  ["Fri", 0, "#4eb473", 0, "red"],
  ["Sat", 0, "#4eb473", 0, "red"],
  ["Sun", 0, "#4eb473", 0, "red"],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const LineChart = ({ openSide, analysis }) => {
  // const formatDataForChart = (rawData) => {
  //   const formattedData = [["Title", "Product", "Generated Amount"], ["Title", "Sales", { role: "style" }, "Expenses", { role: "style" }],];

  //   for (const data of rawData) {
  //     const generatedAmount = parseFloat(data.generatedAmount);
  //     if (isNaN(generatedAmount)) {
  //       console.error(`Invalid generatedAmount value for ${data.title}: ${data.generatedAmount}`);
  //     } else {
  //       formattedData.push([data.title, data.product, generatedAmount, "#4eb473", ]);
  //     }
  //   }
  //   return formattedData;
  // };

  // const data = formatDataForChart(analysis);
  const options = {
    title: "Generated Amount per Data",
    curveType: "function",
    legend: { position: "bottom" },
  };
  // const chartWidth = openSide ? "calc(100% - 300px)" : "100%";
  const { data, isLoading, error } = RevenueExpenditure();

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">There is no data currentlyyyy</div>
        </div>
      </div>
    );
  }

  if (!data || !data.data || (!data.data.revenue && !data.data.expenditure)) {
    return (
      <div className="Chart-container">
        <div className="ResponsiveChart">
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={emptyData}
            options={options}
          />
        </div>
      </div>
    );
  }

  if (data.data.revenue.length === 0 && data.data.expenditure.length === 0) {
    return (
      <div className="Chart-container">
        <div className="ResponsiveChart">
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={emptyData}
            options={options}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="Chart-container">
      <div className="ResponsiveChart">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={lineData}
          options={options}
        />
      </div>
    </div>
  );
};

export default LineChart;
