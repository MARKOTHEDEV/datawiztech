import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../useContext/useContext";

const EmailVerified = () => {
  const { setLoginDrop } = UserAuth();
  const openLogin = () => {
    setLoginDrop(true);
  };

  return (
    <div className="email-card">
      <button className="email-dismiss" type="button">
        ×
      </button>
      <div className="email-header">
        <div className="email-image">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M20 7L9.00004 18L3.99994 13"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </div>
        <div className="email-content">
          <span className="email-title">Email Verified</span>
          <p className="email-message">
            Thank you for verifying. Click on login to login or go to home page.
          </p>
        </div>
        <div className="email-actions">
          <button className="email-history" type="button" onClick={openLogin}>
            Login
          </button>
          <button className="email-track" type="button">
            <Link to="/">Go Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
