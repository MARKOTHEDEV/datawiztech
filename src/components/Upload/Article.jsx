import React, { useState } from "react";
import nextIcon from "../../assets/images/icon-color-ZJR.png";
import prevIcon from "../../assets/images/icon-color-GLh.png";
import { Link } from "react-router-dom";
import profilepic from "../../assets/images/profile-circle.png";
import like from "../../assets/images/icons8-facebook-like-4qo.png";
import download from "../../assets/images/icons8-download-from-the-cloud-dqs.png";
import share from "../../assets/images/icons8-forward-arrow-100-2-F53.png";
import location from "../../assets/images/icon-color-wrq.png";
import year from "../../assets/images/icon-color-Udf.png";
import "./Article.css";
import FetchArticles from "../../hooks/Articles";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import { useQuery } from '@tanstack/react-query';
import { getArticleApi } from "../../api/article.api";

const Article = ({ search=''}) => {
  const reload = () => {
    window.location.reload();
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(15);
  // const [isLoading,setIsLoading] = useState(false)
  // const error =null
  // const { data, isLoading, error } = FetchArticles();
  const {data,isLoading,error} = useQuery({
    queryFn:getArticleApi,
    queryKey:'getArticleApi',
    // 'on'

  })
  if (isLoading) {
    return <DataLoader />;
  }
  if (error) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="error-text-section">
            You have not posted any article
          </div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  if (
    !data ||
    data.length === 0
  ) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">You have not posted any data</div>
        </div>
      </div>
    );
  }

  const articles = data;
  const filteredArticle = search
    ? articles.filter(
        (item) => item.title.toLowerCase().includes(search.toLowerCase())
        // item.periodicity.toLowerCase().includes(search.toLowerCase())
      )
    : articles;

    // console.log({filteredArticle})

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentArticles = filteredArticle.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pb-5">

      <div className="row mt-2 mb-4">
        {currentArticles.length !== 0 ? (
          articles.map((item, index) => (
            <div key={item._id} className="col-lg-4 my-2">
              <div className="upload-result-card">
                <Link to={`/search/article/result/${item.id}`}>
                  <div className="upload-card-title pb-3">{item.title}</div>
                  <div className="search-card-profile">
                    <div className="search-card-flex">
                      <div className="search-card-pic-container">
                        <div className="upload-card-pic">
                          <img
                            src={item.image ? item.image : profilepic}
                            alt=".."
                            className="img-fluid upload-card-pic"
                          />
                        </div>
                      </div>
                      <div className="search-card-name">
                        {item.authorId?.first_name} {item.authorId?.last_name}
                      </div>
                    </div>
                    <div className="data-verified">
                      {item?.verification_status?
                             "verified"
                        : "unverified"}
                    </div>
                  </div>
                  <div className="card-location py-3">
                    <div className="card-location-country-container">
                      <img
                        className="card-location-icon"
                        src={location}
                        alt="..."
                      />
                      <div className="card-location-country">{item.country}</div>
                    </div>
                    <div className="card-location-country">
                      {item.price === 0 || !item.price
                        ? "free"
                        : "#" + item.price}
                    </div>
                  </div>
                  <div className="search-card-icon-part pb-3">
                    <div className="search-card-icon-container">
                      <div className="search-card-count">{item.likes}</div>
                      <img
                        className="search-card-count-icon"
                        src={like}
                        alt=".."
                      />
                    </div>
                    <div className="search-card-icon-container">
                      <div className="search-card-count">{item.download}</div>
                      <img
                        className="search-card-count-icon"
                        src={download}
                        alt=".."
                      />
                    </div>
                    <div className="search-card-icon-container">
                      <div className="search-card-count">{item.share}</div>
                      <img
                        className="search-card-count-icon"
                        src={share}
                        alt=".."
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>
          <div className="empty-pending-friends">
            <div className="card-profile-name">
              Article not found
            </div>
          </div>
        </div>
        )}
      </div>
      <div className="d-flex  align-items-center justify-content-end">
        <div class="pagination-tablet column-gap-4">
          <div class="row-per-page">Rows per page:</div>
          <div class="auto-group-pand-Eru">
            <div class="auto-group-8hsw-kaM">
              <select className="form-control">
                <option>3</option>
                <option>5</option>
                <option>7</option>
                <option>10</option>
              </select>
            </div>
          </div>
          <div className="d-flex column-gap-4">
            <div class="pagenumbers">
              {indexOfFirstData + 1}-
              {Math.min(indexOfLastData, articles.length)} of {articles.length}
            </div>
            {indexOfFirstData + 1 !== 1 ? (
              <img
                class="icon-color-QoK"
                src={nextIcon}
                alt="previous"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastData >= articles.length}
              />
            ) : (
              ""
            )}
            {Math.min(indexOfLastData, articles.length) !== articles.length ? (
              <img
                class="icon-color-jqb"
                src={prevIcon}
                alt="next"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
