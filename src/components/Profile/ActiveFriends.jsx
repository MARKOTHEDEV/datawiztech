import React from "react";
// import profilepic from "../../assets/images/profile-circle.png";
import FetchFriends from "../../hooks/Friends";
import DataLoader from "../../hooks/DataLoader/DataLoader";

const ActiveFriends = () => {
  let profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const { data, isLoading, error } = FetchFriends();
  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">You have no active friends</div>
        </div>
      </div>
    );
  }

  let allFriend = data.data.friends;

  let friends = allFriend.filter((item, index) => {
    return item.status === "approved";
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

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 py-4">
      {friends.map((item, index) => (
        <div className="col" key={index}>
          <div className="card h-100 request-card">
            <div className="card-body">
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
                        !item.senderId.image ? profilepic : item.senderId.image
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
                    item?.senderId?.verification === "verified" ? "active" : ""
                  }`}
                >
                  {item?.senderId?.verification === "verified"
                    ? "verified"
                    : "unverified"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveFriends;
