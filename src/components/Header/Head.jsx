import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/web-1920-1-1-8qX.png";
import NavigationIcons from "./NavigationIcons";


const Head = ({ toggleLoginForm, toggleSignupForm, active }) => {

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolled = currentScrollPos > 0;

      setIsHeaderFixed(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



 
  return (
    <div>
      <div
        className={`container-fluid header-container ${
          isHeaderFixed ? "position-fixed" : ""
        }`}
      >
        <div className="header px-lg-3 py-2">
          <div className="navbar">
            <p className="d-flex justify-content-start align-items-center">
              <i
                className="fa-solid fa-bars d-lg-none hamburger-icon mx-1"
                data-bs-toggle="collapse"
                href="#multiCollapseExample1"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample1"
              ></i>
              <img src={logo} className="logo" alt="" />
            </p>
            <p>
              <Link
                to="/"
                className={`nav-items d-lg-flex d-none ${
                  active === "home" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </p>
            <p>
              <Link
                to="/upload"
                className={`nav-items d-lg-flex d-none ${
                  active === "upload" ? "active" : ""
                }`}
              >
                Upload
              </Link>
            </p>
            <p>
              <Link
                to="/partnership"
                className={`nav-items d-lg-flex d-none ${
                  active === "partnership" ? "active" : ""
                }`}
              >
                Patnership Management
              </Link>
            </p>
            <p>
              <Link
                to="/inquiry"
                className={`nav-items d-lg-flex d-none ${
                  active === "inquiry" ? "active" : ""
                }`}
              >
                Inquiry
              </Link>
            </p>
          </div>

          <NavigationIcons toggleSignupForm={toggleSignupForm} toggleLoginForm ={toggleLoginForm} />
        </div>
      </div>
      <div
        role="menu"
        className="v-menu__content theme--light v-menu__content--fixed menuable__content__active collapse multi-collapse overflow-hidden"
        id="multiCollapseExample1"
        style={{
          minWidth: "42px",
          top: "69px",
          left: "12px",
          transformOrigin: "left top",
          zIndex: 100,
        }}
      >
        <div className="v-list v-sheet theme--light">
          <Link
            to="/home"
            aria-current="page"
            className="className-active-menu v-list-item--active v-list-item v-list-item--link theme--light weight-600 "
            tabindex="0"
            role="menuitem"
            id="list-item-159"
          >
            <div className="v-list-item__title">Home</div>
          </Link>
          <Link
            to="/upload"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-161"
          >
            <div className="v-list-item__title">Upload</div>
          </Link>
          <Link
            to="/partnership"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-163"
          >
            <div className="v-list-item__title">Partnership Management</div>
          </Link>
          <Link
            to="/inquiry"
            className="v-list-item v-list-item--link theme--light weight-600 className-inactive-menu"
            tabindex="0"
            role="menuitem"
            id="list-item-165"
          >
            <div className="v-list-item__title">Inquiry</div>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Head;
