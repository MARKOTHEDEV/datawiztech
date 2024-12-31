import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./Notification.css";
import AllNotification from "./AllNotification";


const Notification = () => {
  const [active, setActive] = useState("home")

  return (
    <div>
      <Header active={active} />
      <div className="container">
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/" className="bread-items">
                  Home
                </Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/profile" className="bread-items">
                  profile
                </Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <Link to="#" className="bread-items active">
                  Notification
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container-fluid notification-container">
        <div className="">
          <div class="notification-box my-4">
            <p class="notification-box-header">Filters</p>
            <div class="notification-active-filters">
              <div class="notification-filters-title mt-2">
                Select the active filters:
              </div>
              <div class="notification-filters-item mt-2">All</div>
              <div class="notification-filters-item mt-2">Activity</div>
              <div class="notification-filters-item mt-2 active">
                Withdrawal
              </div>
              <div class="notification-filters-item mt-2">Credit</div>
              <div class="notification-filters-item mt-2 active">Chat</div>
            </div>
          </div>
          <AllNotification/>
        </div>
      </div>
    </div>
  );
};

export default Notification;
