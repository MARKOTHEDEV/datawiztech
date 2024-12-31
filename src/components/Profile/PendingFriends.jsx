import React, { useState } from "react";
import FetchFriends from "../../hooks/Friends";
// import profilepic from "../../assets/images/profile-circle.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import "./PendingFriends.css";
import { UserAuth } from "../../useContext/useContext";
import axios from "axios";
import toast from "react-hot-toast";

const PendingFriends = () => {
  let profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const { token } = UserAuth();
  const { data, isLoading, error } = FetchFriends();
  const [requestLoading, setRequestLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return (
      <div className="empty-pending-friends">
        <div className="card-profile-name">
          You have no pending friend requests
        </div>
      </div>
    );
  }

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    scroll: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  //   token

  const handleRequest = async (status, requestId, index) => {
    setRequestLoading(true);
    setLoadingStates((prevStates) => ({
      ...prevStates,
      [`${requestId}-${index}`]: true,
    }));

    try {
      const response = await axios.get(
        `https://datawiztechapi.onrender.com/api/v1/friend/${requestId}/${status}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.data;
        toast.success(data.message);
      } else {
        toast.error("Error occured !");
      }
    } catch (err) {
      console.log(err);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else if (error) {
        toast.error("Failed to send request !");
      }
    } finally {
      setRequestLoading(false);
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [`${requestId}-${index}`]: true,
      }));
    }
  };

  let allFriend = data.data.friends;

  let friends = allFriend.filter((item, index) => {
    return item.status === "pending";
  });

  if (friends.length === 0) {
    return (
      <div className="empty-pending-friends">
        <div className="card-profile-name">
          You have no pending friend requests
        </div>
      </div>
    );
  }

  if (friends.length === 1) {
    friends = friends[0];
    return (
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className=" external-request-card overflow-hidden my-2">
            <div className="card-body">
              <div className="pt-2 px-3">
                <p className="search-card-heading">
                  {!friends.senderId.occupation
                    ? friends.senderId.role
                    : friends.senderId.occupation}
                </p>
                <div className="card-profile pb-3">
                  <div className="card-profile-details">
                    <div className="card-profile-pic">
                      <img
                        src={
                          !friends.senderId.image
                            ? profilepic
                            : friends.senderId.image
                        }
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <p className="card-profile-name text-center ">
                      {friends?.senderId?.first_name}{" "}
                      {friends?.senderId?.last_name}
                    </p>
                  </div>
                  <div
                    className={`profile-verified ${
                      friends?.senderId?.verification === "verified"
                        ? "active"
                        : ""
                    }`}
                  >
                    {friends?.senderId?.verification === "verified"
                      ? "verified"
                      : "unverified"}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 m-0">
                  <div
                    className={`profile-approve-btn request-btn ${
                      requestLoading
                        ? "d-flex justify-content-center align-items-center "
                        : "text-center"
                    }`}
                    onClick={() => {
                      handleRequest("true", friends._id, 0);
                    }}
                  >
                    {loadingStates[`${friends._id}-${0}-a`] ? (
                      <DataLoader />
                    ) : (
                      "Accept Friend"
                    )}
                  </div>
                </div>
                <div className="col-6 m-0">
                  <div
                    className={`profile-decline-btn request-btn ${
                      requestLoading
                        ? "d-flex justify-content-center align-items-center "
                        : "text-center"
                    }`}
                    onClick={() => {
                      handleRequest("false", friends._id, 0);
                    }}
                  >
                    {loadingStates[`${friends._id}-${0}-b`] ? (
                      <DataLoader />
                    ) : (
                      "Decline Friend"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    );
  }

  if (friends.length === 2) {
    return (
      <div className="row">
        {friends.map((item, index) => (
          <div className="col-lg-4">
            <div className=" external-request-card overflow-hidden my-2">
              <div className="card-body">
                <div className="pt-2 px-3">
                  <p className="search-card-heading">
                    {!item.senderId.occupation
                      ? item.senderId.role
                      : item.senderId.occupation}
                  </p>
                  <div className="card-profile pb-3">
                    <div className="card-profile-details">
                      <div className="card-profile-pic">
                        <img
                          src={
                            !item.senderId.image
                              ? profilepic
                              : item.senderId.image
                          }
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <p className="card-profile-name text-center ">
                        {item?.senderId?.first_name} {item?.senderId?.last_name}
                      </p>
                    </div>
                    <div
                      className={`profile-verified ${
                        item?.senderId?.verification === "verified"
                          ? "active"
                          : ""
                      }`}
                    >
                      {item?.senderId?.verification === "verified"
                        ? "verified"
                        : "unverified"}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 m-0">
                    <div
                      className={`profile-approve-btn request-btn ${
                        requestLoading
                          ? "d-flex justify-content-center align-items-center "
                          : "text-center"
                      }`}
                      onClick={() => {
                        handleRequest("true", item._id, index);
                      }}
                    >
                      {loadingStates[`${item._id}-${index}-a`] ? (
                        <DataLoader />
                      ) : (
                        "Accept Friend"
                      )}
                    </div>
                  </div>
                  <div className="col-6 m-0">
                    <div
                      className={`profile-decline-btn request-btn ${
                        requestLoading
                          ? "d-flex justify-content-center align-items-center "
                          : "text-center"
                      }`}
                      onClick={() => {
                        handleRequest("false", item._id, index);
                      }}
                    >
                      {loadingStates[`${item._id}-${index}-b`] ? (
                        <DataLoader />
                      ) : (
                        "Decline Friend"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row py-4">
      <Slider className="custom-slider" {...settings}>
        {friends.map((item, index) => (
          <div className=" external-request-card overflow-hidden my-2">
            <div className="card-body">
              <div className="pt-2 px-3">
                <p className="search-card-heading">
                  {!item.senderId.occupation
                    ? item.senderId.role
                    : item.senderId.occupation}
                </p>
                <div className="card-profile pb-3">
                  <div className="card-profile-details">
                    <div className="card-profile-pic">
                      <img
                        src={
                          !item.senderId.image
                            ? profilepic
                            : item.senderId.image
                        }
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <p className="card-profile-name text-center ">
                      {item?.senderId?.first_name} {item?.senderId?.last_name}
                    </p>
                  </div>
                  <div
                    className={`profile-verified ${
                      item?.senderId?.verification === "verified"
                        ? "active"
                        : ""
                    }`}
                  >
                    {item?.senderId?.verification === "verified"
                      ? "verified"
                      : "unverified"}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 m-0">
                  <div
                    className={`profile-approve-btn request-btn ${
                      requestLoading
                        ? "d-flex justify-content-center align-items-center "
                        : "text-center"
                    }`}
                    onClick={() => {
                      handleRequest("true", item._id, index);
                    }}
                  >
                    {loadingStates[`${item._id}-${index}-a`] ? (
                      <DataLoader />
                    ) : (
                      "Accept Friend"
                    )}
                  </div>
                </div>
                <div className="col-6 m-0">
                  <div
                    className={`profile-decline-btn request-btn ${
                      requestLoading
                        ? "d-flex justify-content-center align-items-center "
                        : "text-center"
                    }`}
                    onClick={() => {
                      handleRequest("false", item._id, index);
                    }}
                  >
                    {loadingStates[`${item._id}-${index}-b`] ? (
                      <DataLoader />
                    ) : (
                      "Decline Friend"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {/* <div className="indicators">{indicators}</div> */}
    </div>
  );
};

export default PendingFriends;
