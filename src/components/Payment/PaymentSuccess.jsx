import React from "react";
import "./PaymentSuccess.css"
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div>
      <div class="success-notifications-container">
        <div class="success-check">
          <div class="success-flex">
            <div class="success-flex-shrink-0">
              <svg
                class="succes-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="success-prompt-wrap">
              <p class="success-prompt-heading">Order completed</p>
              <div class="success-prompt-prompt">
                <p>
                Congratulations! Your order has been successfully placed. We hope to see you again !. Check your for confirmation!
                </p>
              </div>
              <div class="success-button-container">
                <Link to="/cart"  class="success-button-main">
                  View status
                </Link>
                <Link to="/" class="success-button-secondary">
                  Dismiss
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
