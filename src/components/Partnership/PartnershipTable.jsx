import React, { useEffect, useRef, useState } from "react";
import cartimage from "../../assets/images/rectangle-39-xzm.png";
import { MdOutlineArrowRight } from "react-icons/md";
import "./PartnershipTable.css";
import PartnershipTableDropdown from "./PartnershipTableDropdown";
import FetchPartnerships from "../../hooks/Partnership";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import { UserAuth } from "../../useContext/useContext";
import { useQuery } from "@tanstack/react-query";
import { getUserArticleApi } from "../../api/article.api";
import { decodeUser } from "../../api/api";

const PartnershipTable = () => {
  const reload = () => {
    window.location.reload();
  };
  const { currentUser ,token} = UserAuth();
  const [dropdowns, setDropdowns] = useState(Array(8).fill(false));
  const [activeIndex, setActiveIndex] = useState(-1);
  // Update dropdown state based on clicked index and current state
  const toggleDropDown = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const {data:partnerships,isLoading,error} = useQuery({
    queryFn:()=>{
      const user_id = decodeUser(token).user_id
      return getUserArticleApi({user_id})
    },
    queryKey:'getUserArticleApi',
    refetchInterval:false,
    refetchOnWindowFocus:false
    // 'on'

  })

  // const partnerships = [
  //   {
  //     partnerId:'1',
  //     role:'Author',
  //     title:'title',
  //     product:'product',
  //     partnership:[
  //       1,2,
  //     ]
  //   }
  // ];
  const author = partnerships
 
  if (isLoading) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">
           Loading...
          </div>
          {/* <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div> */}
        </div>
      </div>
    );
  }
  if (!author || author.length === 0) {
    return (
      <div className="partnership-drop-content mt-3">
        <div className="empty-pending-friends">
          <div className="error-text-section">
            You have no partnership as the author
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
// console.log({data})
  return (
    <div className="partnership-drop-content mt-3 mb-5">
      {/* {isLoading&&<p>Loading...</p>} */}
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
            <div className="partnership-item-type">{item?.price}</div>
          </div>
          <div
            className={`partnership-children-dropdown ${
              activeIndex === index ? "active" : ""
            }`}
          >
            {
              activeIndex === index ?
            <PartnershipTableDropdown item={item} currentUser={currentUser} />
            :''
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartnershipTable;
