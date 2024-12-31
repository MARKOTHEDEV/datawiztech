import React, { useState } from "react";
import "../PartnershipManagement/PartnershipManagement.css";
// import { Link } from "react-router-dom";
import "../PaymentHistoryManagement/AdminPayment.css";
import UserTable from "./UserTable";
import UserSearch from "./UserSearch";
import { UserAuth } from "../../../useContext/useContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserManagement = () => {
  // const Navigate = useNavigate();
  // const { currentUser } = UserAuth();
  // if (currentUser.role !== "Admin") {
  //   toast.error("");
  //   Navigate("/");
  // }
  const [searchText, setSearchText] = useState("");

  const [PaymentDetail, setPaymentDetail] = useState(false);
  const showPaymentDetails = () => {
    setPaymentDetail(true);
  };
  const RemovePaymentDetails = () => {
    setPaymentDetail(false);
  };

  const [search, setSearch] = useState("")
  const handleChange = (value)=>{
    const term = value
    setSearch(term)
  }
  return (
    <div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <UserSearch handleChange={handleChange} search={search} />
        </div>
      </div>
      <UserTable showPaymentDetails={showPaymentDetails} search={search} />
    </div>
  );
};

export default UserManagement;
