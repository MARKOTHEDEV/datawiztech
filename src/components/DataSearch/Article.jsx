import React, { useState } from "react";
import like from "../../assets/images/icons8-facebook-like-4qo.png";
import download from "../../assets/images/icons8-download-from-the-cloud-dqs.png";
import share from "../../assets/images/icons8-forward-arrow-100-2-F53.png";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "./Article.css";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import FetchAllArticles from "../../hooks/AllArticles";
import FetchSearch from "../../hooks/Search";

const Article = ({articles}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const searchTerm =searchParams.get('searchTerm')
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";

    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const [searchTerm, setSearchTerm] = useState(
    //   searchParams.get("searchTerm") || ""
    // );
  if (!articles) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">
            No article
          </div>
        </div>
      </div>
    );
  }

  // const articles = data.data.articles;
  if (articles.length === 0 || !articles) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">No new article</div>
        </div>
      </div>
    )
  }
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
    <div>
      {articles.map((data, index) => (
        <div className="px-2 py-1 active">
          <div className="search-result-card active">
            <Link
              to={`/search/article/result?id=${data.id}&searchTerm=${searchTerm}`}
              className="search-card-title pb-3"
            >
              {data.title}
            </Link>
            <div class="search-card-profile">
              <div
                class="dropdown-profile-menu collapse multi-collapse overflow-hidden"
                role="menu"
                id={"articleCollapseProfile" + index}
                style={{
                  width: "60%",
                  top: "60%",
                  left: "12%",
                  transformOrigin: "left top",
                  zIndex: 8,
                }}
              >
                <div class="search-profile-menu py-2">
                  {data?.partnership?.map((partner, index) => (
                    <Link to="#" class="search-dropdown-item" key={index}>
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
                      src={!data?.authorId?.image ? profilepic : data.authorId.image}
                      data-bs-toggle="collapse"
                      href={"#articleCollapseProfile" + index}
                      role="button"
                      aria-expanded="false"
                      aria-controls={"articleCollapseProfile" + index}
                      alt=".."
                      className="img-fluid search-card-pic"
                    />
                  </div>
                  <div class="search-card-pic-num">
                    {data?.partnership?.length}
                  </div>
                </div>
                <div class="search-card-name">
                  {data?.authorId?.first_name} {data?.authorId?.last_name}
                </div>
              </div>
              <div class="search-card-amount">
                N {!data.price || data.price === 0 ? "Free" : data.price}
              </div>
            </div>
            <Link
              to={`/search/article/result?id=${data.id}&searchTerm=${searchTerm}`}

              className="search-card-info py-2"
            >
              {truncateText(data.summary, 145)}
            </Link>
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
                  {[...Array(Math.floor(data?.rating||0))].map((_, index) => (
                    <GoStarFill key={index} size={20} color="#4eb473" />
                  ))}
                  {data.rating % 1 !== 0 && (
                    <FaRegStarHalfStroke size={20} color="#4eb473" />
                  )}
                  {[...Array(5 - Math.ceil(data.rating||0))].map((_, index) => (
                    <GoStarFill key={index} size={20} color="#e0e0e0" />
                  ))}
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

export default Article;
