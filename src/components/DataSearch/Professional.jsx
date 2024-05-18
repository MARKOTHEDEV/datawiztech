import React from "react";
import like from "../../assets/images/icons8-facebook-like-4qo.png";
import download from "../../assets/images/icons8-download-from-the-cloud-dqs.png";
import share from "../../assets/images/icons8-forward-arrow-100-2-F53.png";
// import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { Link } from "react-router-dom";

const Professional = () => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };
  return (
    <div>
      {[...Array(2)].map((item, index) => (
        <div className="px-2 mb-3">
          <div className="search-result-card active">
            <Link to="/search/professional/result">
              <div className="search-card-professional-title pb-3">
                Article Writing
              </div>
              <div class="search-card-profile">
                <div
                  class="dropdown-profile-menu collapse multi-collapse overflow-hidden"
                  role="menu"
                  id={"professionalCollapseProfile" + index}
                  style={{
                    width: "60%",
                    top: "60%",
                    left: "12%",
                    transformOrigin: "left top",
                    zIndex: 8,
                  }}
                >
                  <div class="search-profile-menu py-2">
                    {[...Array(4)].map((star, index) => (
                      <Link to="" class="search-dropdown-item">
                        <div class="search-dropdown-pic">
                          <img
                            src={profilepic}
                            alt=".."
                            className="search-dropdown-pic"
                          />
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
                        src={profilepic}
                        data-bs-toggle="collapse"
                        href={"#professionalCollapseProfile" + index}
                        role="button"
                        aria-expanded="false"
                        aria-controls={"professionalCollapseProfile" + index}
                        alt=".."
                        className="img-fluid search-card-pic"
                      />
                    </div>
                    <div class="search-card-pic-num">5</div>
                  </div>
                  <div class="search-card-name">Oluwajane Ademidoe</div>
                </div>
                <div class="data-verified">verified</div>
              </div>
              <div className="search-card-info py-2">
                {truncateText(
                  "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt.",
                  80
                )}
              </div>
              <div className="search-card-location-content pb-3">
                <div>Researcher / Article writer</div>
                <div className="search-card-location">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div>Nigeria</div>
                </div>
              </div>
              <div class="search-card-icon-part">
                <div class="search-card-icon-container">
                  <div class="search-card-count">200</div>
                  <img class="search-card-count-icon" src={like} alt=".." />
                </div>
                <div class="search-card-icon-container">
                  <div class="search-card-count">200</div>
                  <img class="search-card-count-icon" src={download} alt=".." />
                </div>
                <div class="search-card-icon-container">
                  <div class="search-card-count">200</div>
                  <img class="search-card-count-icon" src={share} alt=".." />
                </div>
              </div>
              <div className="d-flex justify-content-between pt-3">
                <div className="search-card-star">
                  <div>
                    {[...Array(4)].map((star, index) => (
                      // <label key={index}>
                      //   <input type="radio" name="rating" />
                      //   <FaStar />
                      <GoStarFill size={20} color=" #4eb473" />
                      // </label>
                    ))}
                    <FaRegStarHalfStroke size={20} color="#4eb473" />
                  </div>
                  <div className="search-card-rate">4.4 out of 5</div>
                </div>
                <div className="search-card-date">7th of June, 2020.</div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Professional;
