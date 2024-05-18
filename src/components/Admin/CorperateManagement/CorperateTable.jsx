import React from "react";
import CorperateTableContent from "./CorperateTableContent";
// import { Link } from 'react-router-dom'

const CorperateTable = ({ showPaymentDetails }) => {
  return (
    <div className="admin-partnership-table-container">
      <div className="adminpartnershiptable">
        <div className="admin-partnership-heading">
          <div className="admin-table-widthD">Email</div>
          <div className="admin-table-widthC">Partner ID</div>
          <div className="admin-table-widthC">Reg. date</div>
          <div className="admin-table-widthC">Last login date</div>
          <div className="admin-table-widthA">Account status</div>
          <div className="admin-table-widthC">Verification</div>
          <div className="admin-table-widthB">Action</div>
          
        </div>
        <CorperateTableContent/>
      </div>
    </div>
  );
};

export default CorperateTable;
