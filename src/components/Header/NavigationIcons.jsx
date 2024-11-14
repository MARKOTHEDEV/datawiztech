import React, { memo } from "react";
import { UserAuth } from "../../useContext/useContext";
import useIsUser from "../../hooks/useIsUser";
import lens from "../../assets/images/frame-35-SZf.png";
import search from "../../assets/images/frame-35-gJM.png";
import cartIcon from "../../assets/images/frame-36.png";
import notificationbell from "../../assets/images/frame-156.png";
import { Link } from "react-router-dom";
import UpdateCart from "./UpdateCart";
import UpdateUser from "./UpdateUser";
// import profilepic from "../../assets/images/profile-circle.png";

const NavigationIcons = ({ toggleSignupForm, toggleLoginForm }) => {
  const { currentUser, logout, cartLength } = UserAuth();
  const user = useIsUser(currentUser);
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  console.log({currentUser,user})
  return (
    <>
      <div className="navbar2">
        {user ? (
          <>
            {/* <Link to="/search">
              <div className="nav-icon-container">
                <img className="nav-icons" src={search} alt="..." />
              </div>
            </Link> */}
            {/* <Link to="/profile/notifications">
              <div className="nav-icon-container">
                <img className="nav-icons" src={notificationbell} alt=".." />
              </div>
            </Link> */}
            <Link to="/cart">
              <div className="cart-btn nav-icon-container">
                <UpdateCart cartIcon={cartIcon} />
              </div>
            </Link>
            <UpdateUser currentUser={currentUser} profilepic={profilepic} />
          </>
        ) : (
          <div className="notloggedin">
            <img className="notloggedinSearch" alt="search" src={lens} />
            <div className="signup-btn" onClick={toggleSignupForm}>
              Sign Up
            </div>
            <div className="login-btn" onClick={toggleLoginForm}>
              Login
            </div>
          </div>
        )}
      </div>
      <div
        role="menu"
        className="v-menu__content theme--light v-menu__content--fixed menuable__content__active collapse multi-collapse overflow-hidden"
        id="multiCollapseExample2"
        style={{
          minWidth: "42px",
          top: "69px",
          right: "12px",
          transformOrigin: "right top",
          zIndex: 100,
        }}
      >
        <div className="v-list v-sheet theme--light">
          <Link
            to="/profile"
            aria-current="page"
            className="className-active-menu v-list-item--active v-list-item v-list-item--link theme--light weight-600 "
            tabindex="0"
            role="menuitem"
            id="list-item-159"
          >
            <div className="v-list-item__title text-center">View Profile</div>
          </Link>
          <Link
            to="/profile/messages"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-161"
          >
            <div className="v-list-item__title text-center">
              Messages <span>2</span>
            </div>
          </Link>
          <Link
            to="/profile/notifications"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-163"
          >
            <div className="v-list-item__title text-center">
              Notifications <span>2</span>
            </div>
          </Link>
          <Link
            to="/profile/revenue"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
          >
            <div className="v-list-item__title text-center">
              Revenue History
            </div>
          </Link>
          <Link
            to="/profile/expenditure"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
          >
            <div className="v-list-item__title text-center">Expenditure</div>
          </Link>
          <Link
            to="/profile/verify-account"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
          >
            <div className="v-list-item__title text-center">Verify Account</div>
          </Link>
          <Link
            to="/profile/update-socials"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
          >
            <div className="v-list-item__title text-center">Update Socials</div>
          </Link>
          <div
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
            onClick={logout}
          >
            <div className="v-list-item__title text-center">Logout</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(NavigationIcons);
