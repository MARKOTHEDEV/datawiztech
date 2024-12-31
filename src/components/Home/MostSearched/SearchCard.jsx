import React from "react";
import DataLoader from "../../../hooks/DataLoader/DataLoader";
import Slider from "react-slick";
import likeIcon from "../../../assets/images/icons8-facebook-like-amP.png";
import downloadIcon from "../../../assets/images/icons8-download-from-the-cloud-f6R.png";
import location from "../../../assets/images/icon-color-wrq.png";
import year from "../../../assets/images/icon-color-Udf.png";
import profilepic from "../../../assets/images/profile-circle.png";
import share from "../../../assets/images/frame-401-YHP.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FetchMostSearch from "../../../hooks/MostSearch";
import { Link } from "react-router-dom";

const SearchCard = ({ settings, indicators }) => {
  const reload = () => {
    window.location.reload();
  };
  const { data = [], isLoading, error } = FetchMostSearch();
  if (isLoading) {
    return <DataLoader />;
  }
  if (error) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name d-flex justify-content-center flex-column align-items-center">
            Error occured <br />
            <div className="mt-3 btn btn-outline-success" onClick={reload}>
              Reload
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!data || !data.data || !data.data.product) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name d-flex justify-content-center flex-column align-items-center">
            Data not available <br />
            {/* <div className="mt-3 btn btn-outline-success" onClick={reload}>
              Reload
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name d-flex justify-content-center flex-column align-items-center">
            Data not available <br />
            {/* <div className="mt-3 btn btn-outline-success" onClick={reload}>
              Reload
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  const product = data.data.product;
  function getYearFromDate(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };

  return (
    <div className="">
      {product.length !== 0 ? (
        <Slider className="custom-slider" {...settings}>
          {product.map((data, index) => (
            <div className="most-search-card card h-100 mx-2 my-4" key={index}>
              <div className="card-body card-search-body">
                <Link
                  to={
                    data.product === "Data"
                      ? `/search/data/result/${data._id}`
                      : `/search/article/result/${data._id}`
                  }
                  className="search-card-heading"
                >
                  {truncateText(data.title, 30)}
                </Link>
                <div className="card-profile pb-3">
                  <div className="card-profile-details">
                    <div className="card-profile-pic">
                      <img
                        src={
                          !data.authorId.image
                            ? profilepic
                            : data.authorId.image
                        }
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <p className="card-profile-name text-center ">
                      {data.authorId?.first_name} {data.authorId?.last_name}
                    </p>
                  </div>
                  <div
                    className={
                      data.authorId?.verification === "verified"
                        ? "data-verified"
                        : "card-profile-status"
                    }
                  >
                    {data.authorId?.verification === "verified"
                      ? "verified"
                      : "unverified"}
                  </div>
                </div>
                <div className="card-location">
                  <div className="card-location-country-container">
                    <img
                      className="card-location-icon"
                      src={location}
                      alt="..."
                    />
                    <p className="card-location-country">Nigeria</p>
                  </div>
                  <div className="card-location-year-container">
                    <img
                      className="card-location-year-icon"
                      src={year}
                      alt="..."
                    />
                    <p className="card-location-year">
                      {getYearFromDate(data.date)}
                    </p>
                  </div>
                </div>
                <div className="card-article">
                  <p className="card-article-b">{data.product}</p>
                  <p className="card-article-c">
                    {data.price === 0 || !data.price
                      ? "free"
                      : "#" + data.price}
                  </p>
                </div>
                <div className="card-count-container">
                  <div className="card-count-container-a">
                    <p className="card-count">{data.likes}</p>
                    <p>
                      <img
                        className="card-count-icon"
                        src={likeIcon}
                        alt="..."
                      />
                    </p>
                  </div>
                  <div className="card-count-container-a">
                    <p className="card-count">{data.download}</p>
                    <p>
                      <img
                        className="card-count-icon"
                        src={downloadIcon}
                        alt="..."
                      />
                    </p>
                  </div>
                  <div className="card-count-container-a">
                    <p className="card-count">{data.share}</p>
                    <p>
                      <img className="card-count-icon" src={share} alt="..." />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="empty-pending-friends">
          <div className="card-profile-name d-flex justify-content-center flex-column align-items-center">
            Data not available <br />
          </div>
        </div>
      )}
      <div className="indicators">{indicators}</div>
    </div>
  );
};

export default SearchCard;
