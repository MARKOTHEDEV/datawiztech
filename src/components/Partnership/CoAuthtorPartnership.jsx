import React, { useEffect, useRef, useState } from "react";
import cartimage from "../../assets/images/rectangle-39-xzm.png";
import { MdOutlineArrowRight } from "react-icons/md";
import "./PartnershipTable.css";
import PartnershipTableDropdown from "./PartnershipTableDropdown";
import FetchPartnerships from "../../hooks/Partnership";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import { UserAuth } from "../../useContext/useContext";

const CoAuthtorPartnership = () => {
  const reload = () => {
    window.location.reload();
  };
  const { currentUser } = UserAuth();
  // const [arrayLength, setrrayLength] = useState(0);
  // const [dropdowns, setDropdowns] = useState(Array(8).fill(false));
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1)
    // Update dropdown state based on clicked index and current state
    const toggleDropDown = (index) => {
      setActiveIndex(index === activeIndex ? -1 : index);
    };
  
  const { data, isLoading, error } = FetchPartnerships();

  if (isLoading) {
    return (
      <div className="partnership-drop-content mt-3">
        <DataLoader />
      </div>
    );
  }
  if (error || !data || !data.data) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">
            You have no partnership as the author
          </div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  if (!data.data.partnerships || data.data.partnerships.length === 0) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">
            You have no partnership as the author
          </div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  const partnerships = data.data.partnerships;
  const author = partnerships.filter((item) => {
    return item.partnership.some(
      (partner) =>
        partner &&
        partner.partnerId &&
        partner.partnerId._id.toString() === currentUser._id.toString() &&
        (partner.role.toString() === "Co-author" ||
          partner.role.toString() === "Contributor")
    );
  });
  // console.log(author)

  if (!author || author.length === 0) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">
            You have no partnership as the Co-author
          </div>
          {/* <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div> */}
        </div>
      </div>
    );
  }

  // const toggleDropDown = (index) => {
  //   const updatedDropdowns = [...dropdowns];
  //   updatedDropdowns[index] = !updatedDropdowns[index];
  //   setDropdowns(updatedDropdowns);
  // };

  return (
    <div className="partnership-drop-content mt-3 mb-5">
      {author.map((item, index) => (
        <div className="partnership-box-card mb-3">
          <div className="d-flex align-items-center justify-content-between ">
            <div
              className="partnership-title-box"
              onClick={() => toggleDropDown(index)}
            >
              <div className="arrow-icon-container">
                <MdOutlineArrowRight
                  size={30}
                  className={`cart-dropdown-icon ${
                     activeIndex === index ? "active" : ""
                  }`}
                />
              </div>
              <div>
                <img
                  className="partnership-item-image"
                  src={cartimage}
                  alt=".."
                />
              </div>
              <div className="partnership-item-title">{item?.title}</div>
            </div>
            <div className="partnership-item-type">{item?.product}</div>
          </div>
          <div
            className={`partnership-children-dropdown ${
               activeIndex === index ? "active" : ""
            }`}
          >
            <PartnershipTableDropdown item={item} currentUser={currentUser} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoAuthtorPartnership;
