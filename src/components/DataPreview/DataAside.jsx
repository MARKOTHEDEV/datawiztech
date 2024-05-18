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

const DataAside = () => {
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

  const { data, isLoading, error } = AllData();

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return (
      <div
        className="px-3 overflow-y-auto scrollbar-design"
        style={{ maxHeight: "120vh" }}
      >
        <div className="pb-1">
          <div className={`search-result-card active`}>
            <div className="empty-pending-friends">
              <div className="error-text-section">
                You have not posted any article
              </div>
              <div className="btn btn-outline-success" onClick={reload}>
                Reload
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // console.log(data.data.data)
  if (!data || !data.data || !data.data.data) {
    return (
      <div
        className="px-3 overflow-y-auto scrollbar-design"
        style={{ maxHeight: "120vh" }}
      >
        <div className="pb-1">
          <div className={`search-result-card active`}>
            <div className="empty-pending-friends">
              <div className="error-text-section">
                You have not posted any article
              </div>
              <div className="btn btn-outline-success" onClick={reload}>
                Reload
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allData = data.data.data;
  const article = allData.find((item) => item._id === id);
  //   console.log(article)
  const dataIndex = allData.findIndex((item) => item._id === id);
  const slicedData = allData.slice(dataIndex, dataIndex + 10);
  // console.log(slicedData)

  return (
    <div
      className="px-3 overflow-y-auto scrollbar-design"
      style={{ maxHeight: "120vh" }}
    >
      {slicedData.map((data, index) => (
        <div className="pb-1">
          <div className={`search-result-card ${index === 0 ? "active" : ""}`}>
            <div className="search-card-title pb-3">{data.title}</div>
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
                  {data.partnership.map((partner, index) => (
                    <Link to="#" class="search-dropdown-item" key={partner._id}>
                      <div class="search-dropdown-pic">
                        <img
                          src={
                            !partner?.partnerId?.image
                              ? profilepic
                              : partner?.partnerId?.image
                          }
                          alt=".."
                          className="search-dropdown-pic"
                        />
                      </div>
                      <p class="search-dropdown-name">
                        {partner?.partnerId?.first_name}{" "}
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
                    {data.partnership.length}
                  </div>
                </div>
                <div class="search-card-name">
                  {data?.authorId?.first_name} {data?.authorId?.last_name}
                </div>
              </div>
              {/* <div class="search-card-amount">N 5,000</div> */}
            </div>
            <div className="search-card-info py-2">
              {truncateText(data.summary, 145)}
            </div>
            <div className="search-card-location-content pb-3">
              <div>World Bank</div>
              {/* <div className="search-card-location"> */}
              <div>1900 - 2023</div>
              {/* </div> */}
            </div>
            <div class="search-card-icon-part">
              <div class="search-card-icon-container">
                <div class="search-card-count">{data.likes}</div>
                <img class="search-card-count-icon" src={like} alt=".." />
              </div>
              <div class="search-card-icon-container">
                <div class="search-card-count">{data.download}</div>
                <img class="search-card-count-icon" src={download} alt=".." />
              </div>
              <div class="search-card-icon-container">
                <div class="search-card-count">{data.share}</div>
                <img class="search-card-count-icon" src={share} alt=".." />
              </div>
            </div>
            <div className="d-flex justify-content-between pt-3">
              <div className="search-card-star">
                <div>
                  {[...Array(Math.floor(data.rating))].map((star, index) => (
                    <GoStarFill key={index} size={20} color=" #4eb473" />
                  ))}
                  {data.rating % 1 !== 0 && (
                    <FaRegStarHalfStroke size={20} color="#4eb473" />
                  )}
                </div>
                <div className="search-card-rate">{data.rating} out of 5</div>
              </div>
              <div className="search-card-date">{formatDate(data.date)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataAside;
