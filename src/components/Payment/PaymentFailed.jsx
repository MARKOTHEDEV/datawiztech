import React from "react";
import "./OrderFailed.css";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div>
      <div class="notifications-container">
        <div class="failed-check">
          <div class="failed-flex">
            <div class="failed-flex-shrink-0">
              <svg
                class="failed-svg"
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
            <div class="failed-prompt-wrap">
              <p class="failed-prompt-heading">Order Failed</p>
              <div class="failed-prompt-prompt">
                <p>
                  Ooops! Your order has failed. Try again later !. Check your
                  for confirmation!
                </p>
              </div>
              <div class="failed-button-container">
                <Link to="/cart" class="failed-button-main">
                  View status
                </Link>
                <Link to="/" class="failed-button-secondary">
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

export default PaymentFailed;
