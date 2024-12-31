import React from "react";
import UserTableContent from "./UserTableContent";
// import { Link } from 'react-router-dom'

const UserTable = ({ showPaymentDetails, search }) => {
  
  return (
    <div className="admin-partnership-table-container">
      <div className="adminpartnershiptable">
        <div className="admin-partnership-heading">
          <div className="admin-table-widthA">Username</div>
          <div className="admin-table-widthC">Gender</div>
          <div className="admin-table-widthA">registrn. date</div>
          <div className="admin-table-widthA">Last login date</div>
          <div className="admin-table-widthC">Account status</div>
          <div className="admin-table-widthC">Verification</div>
          <div className="admin-table-widthB">Action</div>
        </div>
       <UserTableContent search={search} />
      </div>
    </div>
  );
};

export default UserTable;
