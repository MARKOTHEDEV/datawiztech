import React from "react";
import { Chart } from "react-google-charts";
import "./Charts.css";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import RevenueExpenditure from "../../hooks/RevenueExpenditure";

export const barData = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
  ["2008", 1430, 340],
  ["2009", 1030, 540],
  ["2010", 900, 540],
  ["2011", 1030, 540],
  ["2012", 1000, 640],
];
export const emptyData = [
  ["Day", "Revenue", "Expenditure"],
  ["Mon", 0, 0],
  ["Tue", 0, 0],
  ["Wed", 0, 0],
  ["Thur", 0, 0],
  ["Fri", 0, 0],
  ["Sat", 0, 0],
  ["Sun", 0, 0],
];

export const options = {
  title: "Company Performance",
  subtitle: "Sales, Expenses, and Profit: 2004-2012",
  series: {
    0: { color: "#4eb473" }, // Sales
    1: { color: "red" }, // Expenses
  },
  legend: {
    position: "none",
  },
};

const BarCharts = () => {
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
            chartType="Bar"
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
            chartType="Bar"
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
          chartType="Bar"
          width="100%"
          height="400px"
          data={barData}
          options={options}
        />
      </div>
    </div>
  );
};

export default BarCharts;
