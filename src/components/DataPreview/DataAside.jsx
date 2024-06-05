import React from "react";
import searchCardPic from "../../assets/images/ellipse-27-bg-Sf3.png";
import like from "../../assets/images/icons8-facebook-like-4qo.png";
import download from "../../assets/images/icons8-download-from-the-cloud-dqs.png";
import share from "../../assets/images/icons8-forward-arrow-100-2-F53.png";
import pic from "../../assets/images/ellipse-27-bg-mHj.png";
import AllData from "../../hooks/AllData";
// import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import Data from "../DataSearch/Data";

const DataAside = ({dataSearch}) => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const reload = () => {
    window.location.reload();
  };
  const { id } = useParams();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();
    let daySuffix = "";
    switch (day % 10) {
      case 1:
        daySuffix = "st";
        break;
      case 2:
        daySuffix = "nd";
        break;
      case 3:
        daySuffix = "rd";
        break;
      default:
        daySuffix = "th";
    }
    return formattedDate.replace(`${day}`, `${day}${daySuffix}`);
  };

  // const { data, isLoading, error } = AllData();

  // if (isLoading) {
  //   return <DataLoader />;
  // }

  // if (error) {
  //   return (
  //     <div
  //       className="px-3 overflow-y-auto scrollbar-design"
  //       style={{ maxHeight: "120vh" }}
  //     >
  //       <div className="pb-1">
  //         <div className={`search-result-card active`}>
  //           <div className="empty-pending-friends">
  //             <div className="error-text-section">
  //               You have not posted any article
  //             </div>
  //             <div className="btn btn-outline-success" onClick={reload}>
  //               Reload
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // console.log(data.data.data)
  // if (!data || !data.data || !data.data.data) {
  //   return (
  //     <div
  //       className="px-3 overflow-y-auto scrollbar-design"
  //       style={{ maxHeight: "120vh" }}
  //     >
  //       <div className="pb-1">
  //         <div className={`search-result-card active`}>
  //           <div className="empty-pending-friends">
  //             <div className="error-text-section">
  //               You have not posted any article
  //             </div>
  //             <div className="btn btn-outline-success" onClick={reload}>
  //               Reload
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // const allData = data.data.data;
  // const article = allData.find((item) => item._id === id);
  // //   console.log(article)
  // const dataIndex = allData.findIndex((item) => item._id === id);
  // const slicedData = allData.slice(dataIndex, dataIndex + 10);
  // console.log(slicedData)

  return (
    <div
      className="px-3 overflow-y-auto scrollbar-design"
      style={{ maxHeight: "120vh" ,cursor:'pointer'}}
      
    >
            <Data responseData={[
                  {
                    "indicator_code": "EN.ATM.CO2E.LF.KT",
                    "author_name": "World Development Indicators",
                    "author_image": null,
                    "title": "CO2 emissions from liquid fuel consumption (kt) ",
                    "period": "Yearly",
                    "price": 10000,
                    "summary": "Carbon dioxide emissions from liquid fuel consumption refer mainly to emissions from use of petroleum-derived fuels as an energy source.",
                    "created_at": "2024-06-05T15:03:32.733474",
                    "no_likes": 0,
                    "no_downloads": 0
                }
            ]} />

      {/* {[...new Array(3)].map((data, index) => (
        <div className="pb-1">
          <div className={`search-result-card ${index === 0 ? "active" : ""}`}>
            <div className="search-card-title pb-3">Hi there boss</div>
            <div class="search-card-profile">
              <div
                class="dropdown-profile-menu collapse multi-collapse overflow-hidden"
                role="menu"
                id={"dataCollapseProfile" + index}
                style={{
                  width: "60%",
                  top: "60%",
                  left: "12%",
                  transformOrigin: "left top",
                  zIndex: 8,
                }}
              >
                <div class="search-profile-menu py-2">
                  {[...new Array(2)].map((partner, index) => (
                    <Link to="#" class="search-dropdown-item" key={index}>
                      <div class="search-dropdown-pic">
                        <img
                          src={profilepic }
                          alt=".."
                          className="search-dropdown-pic"
                        />
                      </div>
                      <p class="search-dropdown-name">
                       First Name and Last Name
                        {partner?.partnerId?.last_name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
              <div class="search-card-flex">
                <div class="search-card-pic-container">
                  <div class="search-card-pic">
                    <img
                      src={searchCardPic}
                      data-bs-toggle="collapse"
                      href={"#dataCollapseProfile" + index}
                      role="button"
                      aria-expanded="false"
                      aria-controls={"dataCollapseProfile" + index}
                      alt=".."
                      className="img-fluid search-card-pic"
                    />
                  </div>
                  <div class="search-card-pic-num">
                  2
                  </div>
                </div>
                <div class="search-card-name">
              Nwokolo Matthew
                </div>
              </div>
            </div>
            <div className="search-card-info py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repudiandae accusantium repellat fugit blanditiis eveniet debitis cupiditate labore tempora nihil?
            </div>
            <div className="search-card-location-content pb-3">
              <div>World Bank</div>
              <div>1900 - 2023</div>
            </div>
            <div class="search-card-icon-part">
              <div class="search-card-icon-container">
                <div class="search-card-count">3</div>
                <img class="search-card-count-icon" src={like} alt=".." />
              </div>
              <div class="search-card-icon-container">
                <div class="search-card-count">2</div>
                <img class="search-card-count-icon" src={download} alt=".." />
              </div>
              <div class="search-card-icon-container">
                <div class="search-card-count">4</div>
                <img class="search-card-count-icon" src={share} alt=".." />
              </div>
            </div>
    
          </div>
        </div>
      ))} */}
      
    </div>
  );
};

export default DataAside;
