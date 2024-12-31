import React from "react";
import "./SideBar.css";
import logo from "../../../assets/images/web-1920-1-1-R7f.png";
import menu from "../../../assets/images/frame-x2M.png";
import { FaUser, FaBookmark, FaWallet } from "react-icons/fa";
import { PiUsersFill } from "react-icons/pi";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";

const SideBar = ({ openSide, toggleSideBar, sideActive }) => {
  return (
    <div className="side-menu-container">
      <div className="logo-container">
        <div className="logo-menu">
          <img
            className={`admin-logo ${openSide ? "active" : ""}`}
            src={logo}
            alt=".."
          />
          <img
            className="admin-menu-burger"
            onClick={toggleSideBar}
            src={menu}
            alt=".."
          />
        </div>
      </div>
      <Link to="/admin/user-management">
      <div
        class={`admin-user-management-container my-4 ${
          openSide ? "active" : ""
        } ${sideActive === "user" ? "clicked" : ""}`}
      >
        <FaUser
          className={`admin-user-icon ${
            sideActive === "user" ? "clicked" : ""
          }`}
          size="1.3rem"
        />
        <div
          className={`admin-user-management ${openSide ? "active" : ""} ${
            sideActive === "user" ? "clicked" : ""
          }`}
        >
          User management
        </div>
      </div>
      </Link>
      <Link to="/admin/partnership-management">
      <div
        class={`admin-user-management-container my-4 ${
          openSide ? "active" : ""
        } ${sideActive === "partnership" || sideActive === "new-partnership" ? "clicked" : ""}`}
      >
        <PiUsersFill
          className={`admin-user-icon partnership-icon ${
            sideActive === "partnership" ? "clicked" : ""
          }`}
          size="1.4rem"
        />
        <div
          className={`admin-user-management ${openSide ? "active" : ""} ${
            sideActive === "partnership" ? "clicked" : ""
          }`}
        >
          Partnership management
        </div>
      </div>
      </Link>
     <Link to="/admin/corporate-management">
     <div
        class={`admin-user-management-container my-4 ${
          openSide ? "active" : ""
        } ${sideActive === "corporate" ? "clicked" : ""}`}
      >
        <FaBookmark
          className={`admin-user-icon ${
            sideActive === "corporate" ? "clicked" : ""
          }`}
          size="20px"
        />
        <div
          className={`admin-user-management ${openSide ? "active" : ""} ${
            sideActive === "corporate" ? "clicked" : ""
          }`}
        >
          Corperate management
        </div>
      </div>
     </Link>
      <Link to="/admin/search-history">
      <div
        class={`admin-user-management-container my-4 ${
          openSide ? "active" : ""
        } ${sideActive === "search" ? "clicked" : ""}`}
      >
        <BiSolidSearchAlt2
          className={`admin-user-icon ${
            sideActive === "search" ? "clicked" : ""
          }`}
          size="1.4rem"
        />
        <div
          className={`admin-user-management ${openSide ? "active" : ""} ${
            sideActive === "search" ? "clicked" : ""
          }`}
        >
          Search history management
        </div>
      </div>
      </Link>
      <Link to="/admin/payment-history">
      <div
        class={`admin-user-management-container my-4 ${
          openSide ? "active" : ""
        } ${sideActive === "payment" ? "clicked" : ""}`}
      >
        <FaWallet
          className={`admin-user-icon  ${
            sideActive === "payment" ? "clicked" : ""
          }`}
          size="1.4rem"
        />
        <div
          className={`admin-user-management ${openSide ? "active" : ""}  ${
            sideActive === "payment" ? "clicked" : ""
          }`}
        >
          Payment history management
        </div>
      </div>
      </Link>
      <Link to="/admin/data-management">
      <div
        class={`admin-user-management-container my-4 ${
          openSide ? "active" : ""
        } ${sideActive === "data" ? "clicked" : ""}`}
      >
        <BiSolidBarChartAlt2
          className={`admin-user-icon ${
            sideActive === "data" ? "clicked" : ""
          }`}
          size="1.4rem"
        />
        <div
          className={`admin-user-management ${openSide ? "active" : ""}  ${
            sideActive === "data" ? "clicked" : ""
          }`}
        >
          Data management
        </div>
      </div>
      </Link>
    </div>
  );
};

export default SideBar;
