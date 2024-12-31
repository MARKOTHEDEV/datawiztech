import React from 'react'

const PaymentDeclined = () => {
  return (
    <div class="paymentdecline-box">
    <div class="remove-data-container">
      <p class="paymentdeclined-title">Remove data</p>
      <p class="paymentdeclined-sub-text">Are you sure you want to remove data?</p>
      <div class="remove-data-btns">
        <div class="remove-data-btn-A">Do later</div>
        <div class="remove-data-btn-B">Try again</div>
      </div>
    </div>
  </div>
  )
}

export default PaymentDeclined
