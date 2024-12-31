import React from "react";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { Link } from "react-router-dom";
import profilepic from "../../assets/images/profile-circle.png";
import like from "../../assets/images/icons8-facebook-like-4qo.png";
import download from "../../assets/images/icons8-download-from-the-cloud-dqs.png";
import share from "../../assets/images/icons8-forward-arrow-100-2-F53.png";
import pic from "../../assets/images/ellipse-27-bg-mHj.png";
import location_icon from "../../assets/images/icon-color-TVs.png";
import scrolldown from "../../assets/images/scrolldown.png";

const ProfessionalAside = ({ articles, id }) => {
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

  return (
    <div
      className="px-3 overflow-y-auto scrollbar-design"
      style={{ position: "relative" }}
    >
      {articles.map((item, index) => (
        <div
          className={`search-result-card m-2 ${index === 0 ? "active" : ""} `}
        >
          <div className="search-card-professional-title pb-1">
            {item.title}
          </div>
          <div class="search-card-profile">
            <div
              class="dropdown-profile-menu collapse multi-collapse overflow-hidden"
              role="menu"
              id={"professionalCollapseProfile" + index}
              style={{
                width: "fit-content",
                top: "60%",
                left: "12%",
                transformOrigin: "left top",
                zIndex: 8,
                padding: "0 10px",
              }}
            >
              <div class="search-profile-menu py-2">
                {[...Array(4)].map((star, index) => (
                  <Link to="" class="search-dropdown-item">
                    <div class="search-dropdown-pic">
                      <img src={pic} alt=".." className="search-dropdown-pic" />
                    </div>
                    <p class="search-dropdown-name">Oluwajane Ademidoe</p>
                  </Link>
                ))}
              </div>
            </div>
            <div class="search-card-flex">
              <div class="search-card-pic-container">
                <div class="search-card-pic">
                  <img
                    src={
                      !item.authorId.image ? profilepic : item.authorId.image
                    }
                    data-bs-toggle="collapse"
                    href={"#professionalCollapseProfile" + index}
                    role="button"
                    aria-expanded="false"
                    aria-controls={"professionalCollapseProfile" + index}
                    alt=".."
                    className="img-fluid search-card-pic"
                  />
                </div>
                <div class="search-card-pic-num">{item.partnership.length}</div>
              </div>
              <div class="search-card-name">
                {item.authorId.first_name} {item.authorId.last_name}
              </div>
            </div>
            <div class="data-verified">verified</div>
          </div>
          <div className="search-card-info py-2">
            {truncateText(item.summary, 80)}
          </div>
          <div className="search-card-location-content pb-2">
            <div>Researcher / Article writer</div>
            <div className="search-card-location">
              <div>
                <img
                  src={location_icon}
                  alt=""
                  className="professional-location-icon"
                />
              </div>
              <div>Nigeria</div>
            </div>
          </div>
          <div class="search-card-icon-part">
            <div class="search-card-icon-container">
              <div class="search-card-count">{item.likes}</div>
              <img class="search-card-count-icon" src={like} alt=".." />
            </div>
            <div class="search-card-icon-container">
              <div class="search-card-count">{item.download}</div>
              <img class="search-card-count-icon" src={download} alt=".." />
            </div>
            <div class="search-card-icon-container">
              <div class="search-card-count">{item.share}</div>
              <img class="search-card-count-icon" src={share} alt=".." />
            </div>
          </div>
          <div className="d-flex justify-content-between pt-3">
            <div className="search-card-star">
              <div className="d-flex">
                {[...Array(4)].map((star, index) => (
                  <GoStarFill size={20} color=" #4eb473" />
                ))}
                <FaRegStarHalfStroke size={20} color="#4eb473" />
              </div>
              <div className="search-card-rate">4.4 out of 5</div>
            </div>
            <div className="search-card-date">{formatDate(item.date)}</div>
          </div>
        </div>
        // </div>
      ))}
      <div className="scrolldown-icon">
        <img src={scrolldown} alt=".." />
      </div>
    </div>
  );
};

export default ProfessionalAside;
