import React from "react";
import './ReversePayment.css'

const ReversePayment = () => {
  return (
    <div className="reverse-payment-container">
      <div class="reverse-prompt-aYq">
        <div class="group-16-w8V">
          <p class="reverse-transaction-TMj">Reverse Transaction</p>
          <p class="are-you-sure-you-want-to-reverse-this-transaction--Yty">
              Are you sure you want to reverse this transaction ?
          </p>
          <div class="auto-group-ml5o-YAD">
            <div class="secondary-button-5vq">Yes, I do</div>
            <div class="primary-button-Xnq">No, I don’t</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReversePayment;
