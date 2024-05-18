import React, { useEffect, useState } from "react";
import "./RequestSection.css";
import profilepic from "../../assets/images/ellipse-24-bg-gX3.png";
import "./PendingFriends.css"
import AddFriends from "./AddFriends";
import PendingRequest from "./PendingRequest";
import ApprovedRequest from "./ApprovedRequest";
import DeclinedRequest from "./DeclinedRequest";
import ExternalRequest from "./ExternalRequests";
import Checkouts from "./Checkouts";

const RequestSection = () => {
  const [myActive, setMyActive] = useState(true);
  const [externalActive, setExternalActive] = useState(false);
  const [addFriends, setAddFriends] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const toggleMyRequest = () => {
    setMyActive(true);
    setExternalActive(false);
    setAddFriends(false);
    setCheckout(false)
  };

  const toggleExternalRequest = () => {
    setExternalActive(true);
    setMyActive(false);
    setAddFriends(false);
    setCheckout(false)

  };

  const toggleFriends = () => {
    setExternalActive(false);
    setMyActive(false);
    setAddFriends(true);
    setCheckout(false)

  };
  const toggleCheckout = () => {
    setCheckout(true)
    setExternalActive(false);
    setMyActive(false);
    setAddFriends(false);
  };


  return (
    <div className="py-4">
      <div className="container request-section">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="d-flex justify-content-between request-container">
              <div
                class={`my-requests text-center ${myActive ? "active" : ""}`}
                onClick={toggleMyRequest}
              >
                My requests
              </div>
              <div
                class={`external-requests text-center ${
                  externalActive ? "active" : ""
                }`}
                onClick={toggleExternalRequest}
              >
                External requests
              </div>
              <div
                class={`external-requests text-center ${
                  addFriends ? "active" : ""
                }`}
                onClick={toggleFriends}
              >
                Add Friends
              </div>
              <div
                class={`external-requests text-center ${
                  checkout ? "active" : ""
                }`}
                onClick={toggleCheckout}
              >
                Checkouts
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div>
          {myActive && (
            <div className="my-request-content">
              <div className="row py-4">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                  <div className="my-request-search">
                    <div className="request-search-box d-flex justify-content-between ">
                      <input type="text" className="request-section-input" />
                      <div className="profile-search-section">Search</div>
                    </div>
                    {/* <div className="profile-search-filter">
                      <img src={filter} className="search-filter" alt="..." />
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-3"></div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="pending-request">Pending</div>
                </div>
                <div className="col-9 position-relative d-flex align-items-center justify-content-center">
                  <div className="pending-request-line"></div>
                </div>
              </div>
             <PendingRequest/>
              <div className="row">
                <div className="col-3">
                  <div className="pending-request">Approved</div>
                </div>
                <div className="col-9 position-relative d-flex align-items-center justify-content-center">
                  <div className="pending-request-line"></div>
                </div>
              </div>
             <ApprovedRequest/>
              <div className="row">
                <div className="col-3">
                  <div className="pending-request">Declined</div>
                </div>
                <div className="col-9 position-relative d-flex align-items-center justify-content-center">
                  <div className="pending-request-line"></div>
                </div>
              </div>
              <DeclinedRequest/>
            </div>
          )}
          {externalActive && (
              <ExternalRequest/>
          )}
          {addFriends && (
            <AddFriends profilepic={profilepic} />
          )}
          {checkout && (
            <Checkouts profilepic={profilepic} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestSection;
