import React from "react";
import "./AdminHeader.css";
import adminnotif from "../../../assets/images/frame-168-rqo.png";
import adminimage from "../../../assets/images/ellipse-27-bg-JgR.png";
import { UserAuth } from "../../../useContext/useContext";

const AdminHeader = ({headings}) => {
  const profilepic =
  "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";

  const {currentUser} = UserAuth()
  return (
    <div className="admin-header-container mb-3">
      <div className="admin-heading-title">{headings}</div>
      <div className="admin-header-icons">
        <img class="admin-notification" src={adminnotif} alt="..." />
        <img class="admin-profile-image" src={currentUser.image?? profilepic} alt="..." />
      </div>
    </div>
  );
};

export default AdminHeader;
