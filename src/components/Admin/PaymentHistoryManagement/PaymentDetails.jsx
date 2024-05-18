import React from "react";
import { TbArrowBigLeftFilled } from "react-icons/tb";
// import { Link } from "react-router-dom";

const PaymentDetails = ({RemovePaymentDetails, payment}) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  
    return `${formattedHours}:${minutes}${period}`;
  }
  return (
    <div>
      <div className="row pt-4">
        <div className="col-3">
          <div className="" style={{cursor:"pointer"}} onClick={RemovePaymentDetails}>
            <TbArrowBigLeftFilled color="#4eb473" size={30} />
            <span style={{ color: "#4eb473", fontWeight: 600 }}>Back</span>
          </div>
        </div>
        <div class="col-6 trnsaction-details-heading">Transaction Details</div>
      </div>
      <div className="row">
        <div className="col-lg-11">
          <div class="transaction-box">
            <div class="payment-transaction">
              <div class="transaction-date-Gky">Transaction Date</div>
              <div className="side-flex">
                <div class="trasanction-item">{formatDate(payment.created_at)}</div>
                <div class="trasanction-item-item">{formatTime(payment.created_at)}</div>
              </div>
            </div>
          </div>
          <div class="transaction-box">
            <div class="payment-transaction">
              <div class="transaction-date-Gky">Transaction ID</div>
              <div className="side-flex">
                <div class="trasanction-item">{payment.tx_ref}</div>
              </div>
            </div>
          </div>
          <div class="transaction-box">
            <div class="payment-transaction">
              <div class="transaction-date-Gky">Amount</div>
              <div className="side-flex">
                <div class="trasanction-item">#{payment.amount.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div class="transaction-box">
            <div class="payment-transaction">
              <div class="transaction-date-Gky">Transaction Status</div>
              <div className="side-flex">
                <div class="approved-bold approved-payment">{payment.processor_response}</div>
              </div>
            </div>
          </div>
          {/* <div class="transaction-box">
            <div class="payment-transaction">
              <div class="transaction-date-Gky">Receiver type</div>
              <div className="side-flex">
                <div class="trasanction-item">Individual</div>
              </div>
            </div>
          </div> */}
          <div class="transaction-box">
            <div class="payment-transaction">
              <div class="transaction-date-Gky">Sender type</div>
              <div className="side-flex">
                <div class="trasanction-item">{payment.user_id.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 d-flex align-items-center justify-content-center ">
        <div class="reverse-transaction-btn">Reverse Transaction</div>
      </div>
    </div>
  );
};

export default PaymentDetails;
