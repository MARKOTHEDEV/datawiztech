import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../useContext/useContext";
import toast from "react-hot-toast";
import ActionLoader from "../Loader/ActionLoader";
import profilepic from "../../assets/images/profile-circle.png";
import PendingFriends from "./PendingFriends";
import ActiveFriends from "./ActiveFriends";
import axios from "axios";

const AddFriends = () => {
  const navigate = useNavigate();
  const { token, currentUser } = UserAuth();
  const [btnStatus, setBtnStatus] = useState("Add Friend");
  const [account, setAccount] = useState({});
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  const handleSearch = (e) => {
    setBtnStatus("Add Friend");
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log("Before search - btnStatus:", btnStatus);
    setBtnStatus("Add Friend");
    console.log("After reset - btnStatus:", btnStatus);
    if (!searchTerm) {
      toast.error(`The input field can not be empty`);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    try {
      const response = await fetch(
        "https://datawiztechapi.onrender.com/api/v1/search-user",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchTerm: searchTerm,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setAccount(data.profile);
        toast.success(data.message);
        setSearchActive(true);
        setSearchTerm("");
        setBtnStatus("Add Friend");
      } else {
        toast.error(data.message);
        setSearchActive(false);
      }
    } catch (error) {
      setSearchLoading(false);
      toast.error(error.message);
      console.log("Error finding account:", error.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const addUser = async (userId) => {
    if (currentUser.email === account.email) {
      toast.error("You can not add yourself !");
      return;
    }

    setRequestLoading(true);
    try {
      const response = await axios.get(
        `https://datawiztechapi.onrender.com/api/v1/add-friend/${userId}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        setBtnStatus("Request Sent");
        toast.success(data.message);
      } else {
        toast.error("Error occured !");
      }
    } catch (error) {
      console.log("Error adding user:", error.message);
      setRequestLoading(false);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else if (error) {
        toast.error("Failed to send request !");
      }
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="my-request-content">
      <div className="row py-4">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className="my-request-search">
            <div className="request-search-box d-flex justify-content-between ">
              <input
                type="text"
                className="request-section-input"
                placeholder="Enter username or email"
                name="searchTerm"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div
                className={`profile-search-section ${
                  searchLoading
                    ? "d-flex align-items-center justify-content-center"
                    : "text-center"
                }`}
                style={{
                  cursor: searchLoading ? "not-allowed" : "pointer",
                }}
                onClick={handleSearchSubmit}
              >
                {searchLoading ? <ActionLoader /> : "Search"}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
      {searchActive && (
        <div className="row py-4">
          <div className="pending-request">Search Result</div>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <div className=" external-request-card overflow-hidden my-2">
                <div className="card-body">
                  <div className="pt-2 px-3">
                    <p className="search-card-heading">
                      {account?.occupation || account?.role}
                    </p>
                    <div className="card-profile pb-3">
                      <div className="card-profile-details">
                        <div className="card-profile-pic">
                          <img
                            src={account?.image || profilepic}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <p className="card-profile-name text-center ">
                          {account?.first_name} {account?.last_name}
                        </p>
                      </div>
                      <div
                        className={`profile-verified ${
                          account?.verification === "verified" ? "active" : ""
                        }`}
                      >
                        {account?.verification ? "Verified" : "Unverified"}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 m-0">
                      <div
                        className={`profile-approve-btn ${
                          requestLoading
                            ? "d-flex align-items-center justify-content-center"
                            : "text-center"
                        }`}
                        onClick={() => addUser(account._id)}
                        style={{
                          cursor:
                            requestLoading || btnStatus === "Request Sent"
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        {requestLoading ? <ActionLoader /> : btnStatus}
                      </div>
                    </div>
                    {/* <div className="col-6 m-0">
                      <div className="profile-decline-btn">Remove Request</div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      )}

      <div>
        <div className="pending-request mt-4">Pending Requests</div>
        <PendingFriends />
      </div>

      <div className="pending-request mt-4">Active Friends</div>
      <ActiveFriends />
    </div>
  );
};

export default AddFriends;
