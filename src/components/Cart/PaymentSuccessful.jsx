import React from 'react'
import "./RemoveData.css"
import { Link } from 'react-router-dom'

const PaymentSuccessful = () => {
  return (
    <div class="paymentsuccess-box">
    <div class="remove-data-container">
      <p class="remove-data-title pb-2">Payment successful</p>
      <p class="remove-data-sub-text">Your payment as been made successfully</p>
      <div class="remove-data-btns">
        <Link to='/' class="remove-data-btn-B">Back to home page</Link>
        {/* <div class="remove-data-btn-B">Yes</div> */}
      </div>
    </div>
  </div>
  )
}

export default PaymentSuccessful
