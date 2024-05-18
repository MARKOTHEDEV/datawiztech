import React, { useState } from 'react'
import ReversePayment from './ReversePayment'
import ReversePaymentComment from './ReversePaymentComment'
import FectchCheckouts from '../../../hooks/Checkouts'
import DataLoader from '../../../hooks/DataLoader/DataLoader'
// import { Link } from 'react-router-dom'

const PaymentTable = ({showPaymentDetails}) => {
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
  
  const reload = () => {
    window.location.reload();
  };
  const {data, isLoading, error} = FectchCheckouts()

  if(isLoading){
    return <DataLoader active={true}/>
  }

  if (error) {
    <div className="pb-1">
      <div className={`search-result-card active`}>
        <div className="empty-pending-friends">
          <div className="error-text-section">
            You have no payment list
          </div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    </div>;
  }

  if (!data || !data.data || !data.data.checkouts) {
    <div className="pb-1">
      <div className={`search-result-card active`}>
        <div className="empty-pending-friends">
          <div className="error-text-section">You have no payment list</div>
        </div>
      </div>
    </div>;
  }

  if (data.data.checkouts.length === 0) {
    return (
      <div className="pb-1">
        <div className={`search-result-card active`}>
          <div className="empty-pending-friends">
            <div className="error-text-section">You have no payment list</div>
          </div>
        </div>
      </div>
    );
  }

  const checkouts = data.data.checkouts

  return (
    <div>
      <div className="admin-partnership-table-container">
        <div className="adminpartnershiptable">
          <div className="admin-partnership-heading">
            <div className="admin-table-widthA">Date</div>
            <div className="admin-table-widthD">Transaction ID</div>
            <div className="admin-table-widthA">Amount</div>
            <div className="admin-table-widthA">Transaction status</div>
            <div className="admin-table-widthA">Receiver type</div>
            <div className="admin-table-widthA"></div>
          </div>
          {checkouts.map((item, index) => (
            <div className="admin-partnership-body" key={index}>
              <div className="admin-table-body-widthA">
                <div>{formatDate(item.created_at)}</div>
                <div className="reverse-transaction">{formatTime(item.created_at)}</div>
              </div>
              <div className="admin-table-body-widthD">{item.tx_ref}</div>
              <div className="admin-table-body-widthA">#{item.amount.toLocaleString()}</div>
              <div className="admin-table-body-widthA">
                <div className="approved-payment">{item.processor_response}</div>
              </div>
              <div className="admin-table-body-widthA partnership-author-column">
                {item.user_id.role}
              </div>
              {/* <Link to=''> */}
                <div className="admin-table-body-widthA reverse-transaction" onClick={()=>{showPaymentDetails(item)}}>
                  Reverse Transaction
                </div>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
      <div>
        {/* <ReversePayment/> */}
        {/* <ReversePaymentComment/> */}
        
      </div>
    </div>
  )
}

export default PaymentTable
