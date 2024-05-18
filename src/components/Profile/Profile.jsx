import React, {useState} from "react";
import Header from "../Header/Header";
import Breadcrumbs from "./Breadcrumbs";
import './Profile.css'
import ProfileSection from "./ProfileSection";
import RequestSection from "./RequestSections";
import '../Header/Header.css'

const Profile = () => {
  const [active, setActive] = useState("home");

  return (
    <div>
      <Header active={active}/>
      <Breadcrumbs/>
    <div className="container-fluid profile-section-bg">
      <ProfileSection/>
      <RequestSection/>
    </div>
    </div>
  );
};

export default Profile;
