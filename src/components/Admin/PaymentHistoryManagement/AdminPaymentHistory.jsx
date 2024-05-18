import React, { useState } from "react";
import "../PartnershipManagement/PartnershipManagement.css";
import { Link } from "react-router-dom";
import PaymentSearch from "./PaymentSearch";
import "./AdminPayment.css";
import PaymentTable from "./PaymentTable";
import PaymentDetails from "./PaymentDetails";

const AdminPaymentHistory = () => {
  const [payment, setPayment] = useState({})
  const [PaymentDetail, setPaymentDetail] = useState(false)
  const showPaymentDetails = (payment) =>{
    setPayment(payment)
    setPaymentDetail(true)
  }
  const RemovePaymentDetails = () =>{
    setPaymentDetail(false)
  }

  return (
    <div>
      <div className="row mb-3">
        <div className="col-lg-8">
          <PaymentSearch />
        </div>
      </div>
      {PaymentDetail?<PaymentDetails payment={payment} RemovePaymentDetails={RemovePaymentDetails} />: <PaymentTable showPaymentDetails={showPaymentDetails}/>}
    </div>
  );
};

export default AdminPaymentHistory;
