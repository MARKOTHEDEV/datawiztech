import React from "react";
import location_icon from "../../assets/images/icon-color-TVs.png";
import { GoStarFill } from "react-icons/go";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import profession_pic from "../../assets/images/ellipse-27-bg-PXo.png";
import profilepic from "../../assets/images/profile-circle.png";

const ProfessionalMain = ({ article }) => {
  const ratings = [
    { rate: "5 star", rating: "80%" },
    { rate: "4 star", rating: "65%" },
    { rate: "3 star", rating: "50%" },
    { rate: "2 star", rating: "40%" },
    { rate: "1 star", rating: "25%" },
  ];
  return (
    <div className="">
      <div className="professional-main-container py-2 px-lg-5 px-3">
        <div className="professional-pic-container">
          <img
            src={!article.authorId.image ? profilepic : article.authorId.image}
            alt="..."
            className="professional-pic"
          />
        </div>
        <div className="text-center professional-profile-name">
          {article.authorId.first_name} {article.authorId.last_name}
        </div>
        <div className="search-card-location-content pb-3">
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
        <div className="professional-bio pb-2">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint. Velit officia consequat
          duis enim velit mollit. Exercitation veniam consequat sunt nostrud
          amet.
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="professional-profile-btn">Contact me</div>
          <div className="professional-profile-rate">N 3,000 / Hr</div>
        </div>
        <div className="row ">
          <div className="col-lg-6 pt-5">
            <div className="professsional-view-rating">View Rating</div>
            <div className="search-card-star pt-2">
              <div>
                <div className="d-flex">
                  {[...Array(4)].map((star, index) => (
                    <GoStarFill size={18} color=" #4eb473" />
                  ))}
                  <FaRegStarHalfStroke size={18} color="#4eb473" />
                </div>
              </div>
              <div className="search-card-rate">4.4 out of 5</div>
            </div>
            <div className="professional-customer py-2">2,306 customers</div>
            {ratings.map((star, index) => (
              <div className="professional-rating-section pb-3">
                <div className="professional-rating-star">{star.rate}</div>
                <div class="professional-progress-bar">
                  <div
                    class="professional-progress-fill"
                    style={{ width: star.rating }}
                  ></div>
                </div>
                <div className="professional-rating-perc">{star.rating}</div>
              </div>
            ))}
            <div className="search-card-icon-part">
              <div className="search-card-icon-container">
                <div className="search-card-count">200</div>
                <div className="professional-events">Likes</div>
              </div>
              <div className="search-card-icon-container">
                <div className="search-card-count">200</div>
                <div className="professional-events">Downloads</div>
              </div>
              <div className="search-card-icon-container">
                <div className="search-card-count">200</div>
                <div className="professional-events">Shares</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 pt-5">
            <div className="professsional-view-rating pb-3">View Service</div>
            <div className="professional-services">
              <div class="professional-service-items">Research Writing</div>
              <div class="professional-service-items">Article Writing</div>
              <div class="professional-service-items">Research Paper</div>
              <div class="professional-service-items">Data Analysis</div>
              <div class="professional-service-items">Essay Writing</div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="professsional-view-rating">View Review</div>
          {[...Array(4)].map((star, index) => (
            <div className="py-2">
              <div className="professional-review-profile">
                <div>
                  <img
                    src={profession_pic}
                    alt=".."
                    className="professional-review-pic"
                  />
                </div>
                <div className="professional-review-name">
                  Adetuwo Adekunle Israel
                </div>
                <div className="professional-review-comment">
                  I really love it.
                </div>
                {/* <div></div> */}
              </div>
              <div className="professional-review-datetime">
                <div>
                  {[...Array(4)].map((star, index) => (
                    <GoStarFill size={15} color=" #4eb473" className="mx-1" />
                  ))}
                  <FaRegStarHalfStroke
                    size={15}
                    color="#4eb473"
                    className="mx-1"
                  />
                </div>
                <div class="professional-review-date">
                  Reviewed on 27 - 10 - 2020
                </div>
                <div class="professional-review-time"> 5:25PM</div>
              </div>
              <div className="professional-review-comments">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet. Amet minim
                mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                Velit officia consequat duis enim velit mollit. Exercitation
                veniam consequat sunt nostrud amet. Amet minim mollit non
                deserunt ullamco est sit aliqua dolor do amet sint. Velit
                officia consequat duis enim velit mollit. Exercitation veniam
                consequat sunt.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMain;
