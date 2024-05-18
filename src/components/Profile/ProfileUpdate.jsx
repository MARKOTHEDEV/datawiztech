import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import FetchCountryCodes from "../../hooks/CountryCodes";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import Bio from "./Bio";

const ProfileUpdate = () => {
  const [active, setActive] = useState("home");
  // const { data = [], isLoading, error } = FetchCountryCodes();
  // if (isLoading) {
  //   return <DataLoader />;
  // }
  // if (error) {
  //   return <div>Error:{error.message}</div>;
  // }

  // console.log(data.data)
  return (
    <div>
      <Header active={active} />
      <div className="container">
        <p class="top-breadcrumbs">
          <Link to="/profile" class="bread-items active">
            Profile
          </Link>
        </p>
        <Bio />
      </div>
    </div>
  );
};

export default ProfileUpdate;
