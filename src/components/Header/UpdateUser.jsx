import React from "react";
import FetchDetails from "../../hooks/FetchDetails";
import ComponentLoader from "../../hooks/ComponentLoader/ComponentLoader";

const UpdateUser = ({ currentUser, profilepic }) => {
  // const { data=[], isLoading, error } = FetchDetails();
  // if (isLoading) {
  //   return <ComponentLoader />;
  // }

  // if (error) {
  //   <div className="profile-pic nav-icon-container">
  //     <img
  //       src={currentUser.image ?? profilepic}
  //       data-bs-toggle="collapse"
  //       href="#multiCollapseExample2"
  //       role="button"
  //       aria-expanded="false"
  //       aria-controls="multiCollapseExample2"
  //       className="img-fluid profile-pic"
  //       alt=".."
  //     />
  //   </div>;
  // }

  // if (data.length === 0) {
  //   <div className="profile-pic nav-icon-container">
  //     <img
  //       src={currentUser.image ?? profilepic}
  //       data-bs-toggle="collapse"
  //       href="#multiCollapseExample2"
  //       role="button"
  //       aria-expanded="false"
  //       aria-controls="multiCollapseExample2"
  //       className="img-fluid profile-pic"
  //       alt=".."
  //     />
  //   </div>;
  // }

  // if (!data || !data.data || !data.data.user) {
  //   <div className="profile-pic nav-icon-container">
  //     <img
  //       src={profilepic}
  //       data-bs-toggle="collapse"
  //       href="#multiCollapseExample2"
  //       role="button"
  //       aria-expanded="false"
  //       aria-controls="multiCollapseExample2"
  //       className="img-fluid profile-pic"
  //       alt=".."
  //     />
  //   </div>;
  // }




  // if (data.data.user) {
  //   localStorage.setItem("datawizuser", JSON.stringify(data.data.user));
  // }

  return (
    <div 
    className="profile-pic nav-icon-container"
    >
      <img
        src={currentUser?.image ?? profilepic}
        data-bs-toggle="collapse"
        href="#multiCollapseExample2"
        role="button"
        aria-expanded="false"
        aria-controls="multiCollapseExample2"
        className="img-fluid profile-pic"
        alt=".."
      />
    </div>
  );
};

export default UpdateUser;
