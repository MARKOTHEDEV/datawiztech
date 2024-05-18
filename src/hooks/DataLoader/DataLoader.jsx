import React from "react";
import "./DataLoader.css";

const DataLoader = ({active, search}) => {
  if(!active){
    return (
      <div className="dataloader">
        <svg className="datasvg" viewBox="25 25 50 50">
          <circle className="dataCircle" r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  }

  if(search){
    return (
      <div className="dataloader search">
        <svg className="datasvg" viewBox="25 25 50 50">
          <circle className="dataCircle" r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  }

  return (
    <div className="dataloader active">
      <svg className="datasvg" viewBox="25 25 50 50">
        <circle className="dataCircle" r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default DataLoader;
