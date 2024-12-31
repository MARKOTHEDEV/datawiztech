import React, { useState } from "react";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import ExternalRequests from "../../hooks/ExternalRequests";
import { UserAuth } from "../../useContext/useContext";
import toast from "react-hot-toast";
import axios from "axios";
import ActionLoader from "../Loader/ActionLoader";
import { Link } from "react-router-dom";

const ExternalRequest = () => {
  const { currentUser, token } = UserAuth();
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const { data, isLoading, error } = ExternalRequests();

  // const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});
  // const [approveState, setApprovedState] = useState("Approved Request");
  // const [declineState, setDeclinedState] = useState("Decline Request");

  const handleRequest = async (status, productId, index, product) => {
    try {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [`${productId}-${index}`]: true,
      }));

      console.log(product);
      const response = await axios.post(
        `https://datawiztechapi.onrender.com/api/v1/request-response/${productId}`,
        { productStatus: status, product: product },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        // if (status === "Accepted") {
        //   setApprovedState("Approved");
        // } else {
        //   setDeclinedState("Declined");
        // }
      } else {
        toast.error("Error occured");
      }
    } catch (err) {
      console.log(err);
      if (err.response.data) {
        if (!err.response.data.message) {
          toast.error(err.code);
        } else {
          toast.error(err.response.data.message);
        }
      } else {
        toast.error("Server Error!");
      }
    } finally {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [`${productId}-${index}`]: false,
      }));
    }
  };

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return (
      <div className="external-request-container">
        <div className="row py-4">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="my-request-search">
              <div className="request-search-box d-flex justify-content-between ">
                <input type="text" className="request-section-input" />
                <div className="profile-search-section">Search</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">You have no pending requests</div>
        </div>
      </div>
    );
  }

  if (!data || !data.data || !data.data.data) {
    return (
      <div className="external-request-container">
        <div className="row py-4">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="my-request-search">
              <div className="request-search-box d-flex justify-content-between ">
                <input type="text" className="request-section-input" />
                <div className="profile-search-section">Search</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">You have no pending requests</div>
        </div>
      </div>
    );
  }

  // console.log(data.data.data)

  if (data.data.data.length === 0) {
    return (
      <div className="external-request-container">
        <div className="row py-4">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="my-request-search">
              <div className="request-search-box d-flex justify-content-between ">
                <input type="text" className="request-section-input" />
                <div className="profile-search-section">Search</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">You have no pending requests</div>
        </div>
      </div>
    );
  }

  const allRequest = data.data.data;

  return (
    <div className="external-request-container">
      <div className="row py-4">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className="my-request-search">
            <div className="request-search-box d-flex justify-content-between ">
              <input type="text" className="request-section-input" />
              <div className="profile-search-section">Search</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4 py-4">
        {allRequest.map((item, index) => (
          <div class="col" key={index}>
            <div class=" external-request-card overflow-hidden ">
              <div class="card-body">
                <div className="pt-2 px-3">
                  <Link
                    to={`/search/data/result/${item._id}`}
                    className="search-card-heading"
                  >
                    {item.title}
                  </Link>
                  <p className="card-profile">
                    <div className="card-profile-details">
                      <div className="profile-request-card-name ">
                        Requested By:{" "}
                        <span>
                          <img
                            src={item.authorId.image ?? profilepic}
                            class="rounded-circle"
                            alt="..."
                            style={{ width: "1rem", height: "1rem" }}
                          />
                        </span>{" "}
                        <span>
                          {item.authorId.first_name} {item.authorId.last_name}
                        </span>
                      </div>
                    </div>
                    <div className="profile-request-card active">
                      {item.verification}
                    </div>
                  </p>
                  <p className="card-article">
                    <p className="card-article-b">N {item.price}</p>
                    <p className="card-article-c">
                      {item.product === "Data" ? item.periodicity : "Article"}
                    </p>
                  </p>
                </div>
                <div className="row">
                  <div className="col-6 m-0">
                    <div
                      className="profile-approve-btn"
                      onClick={() =>
                        handleRequest(
                          "Accepted",
                          item._id,
                          `${index}-a`,
                          item.product
                        )
                      }
                      style={{
                        cursor: loadingStates[`${item._id}-${index}-a`]
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      {loadingStates[`${item._id}-${index}-a`] ? (
                        <ActionLoader />
                      ) : (
                        "Approve Request"
                      )}
                    </div>
                  </div>
                  <div className="col-6 m-0">
                    <div
                      className="profile-decline-btn"
                      onClick={() =>
                        handleRequest(
                          "Declined",
                          item._id,
                          `${index}-b`,
                          item.product
                        )
                      }
                      style={{
                        cursor: loadingStates[`${item._id}-${index}-b`]
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      {loadingStates[`${item._id}-${index}-b`] ? (
                        <ActionLoader />
                      ) : (
                        "Decline Request"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExternalRequest;
