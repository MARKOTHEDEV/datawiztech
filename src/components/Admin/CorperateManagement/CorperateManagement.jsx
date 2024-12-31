import React, { useState } from "react";
import "../PartnershipManagement/PartnershipManagement.css";
// import { Link } from "react-router-dom";
import "../PaymentHistoryManagement/AdminPayment.css";
import CorperateTable from "./CorperateTable";
import CorperateSearch from "./CorperateSearch";
import { UserAuth } from "../../../useContext/useContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CorperateManagement = () => {
  const [PaymentDetail, setPaymentDetail] = useState(false);
  const showPaymentDetails = () => {
    setPaymentDetail(true);
  };
  const RemovePaymentDetails = () => {
    setPaymentDetail(false);
  };

  return (
    <div>
      <div className="row mb-3">
        <div className="col-lg-12">
          <CorperateSearch />
        </div>
      </div>
      <CorperateTable showPaymentDetails={showPaymentDetails} />
    </div>
  );
};

export default CorperateManagement;
