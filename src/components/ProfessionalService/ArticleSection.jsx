import React from "react";
import ProfessionalAside from "./ProfessionalAside";
import ProfessionalMain from "./ProfessionalMain";
import showall from "../../assets/images/frame-158-c3B.png";
import remove_filter_item from "../../assets/images/frame-160-nE5.png";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import FetchArticles from "../../hooks/Articles";

const ArticleSection = ({ id }) => {
  const { data = [], isLoading, error } = FetchArticles();
  if (isLoading) {
    return <DataLoader />;
  }
  if (error) {
    return (
      <div className="messages-box-wrapper active">
        <div className="messages-box px-3 pt-4">
          <div className="each-message-profile">
            <div class="message-snip pt-2">Error occured</div>
          </div>
        </div>
      </div>
    );
  }

  const fetchArticles = data.data.articles;
  const article = fetchArticles.find((item) => item._id === id);
  //   console.log(article)
  const articleIndex = fetchArticles.findIndex((item) => item._id === id);
  const slicedArticles = fetchArticles.slice(articleIndex, articleIndex + 10);

  const filterArr = [
    { item: "Senegal" },
    { item: "1990-2020" },
    { item: "NGN" },
    { item: "Nigeria" },
    { item: "Export of good and services" },
    { item: "World Bank" },
    { item: "SNG" },
    { item: "Congo" },
    { item: "International Research institute" },
  ];
  return (
    <div>
      <div className="container-fluid pt-4">
        <div className="row filter-box px-lg-4 px-3">
          <div className="preview-filter-container">
            {filterArr.map((filter, index) => (
              <div class="filter-items" key={index}>
                <div class="filter-title">{filter.item}</div>
                <div className="filter-cancel-box">
                  <img
                    class="remove-filter"
                    src={remove_filter_item}
                    alt=".."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-fluid pt-3">
        <div className="row data-preview-section overflow-hidden">
          <div className="col-lg-4 preview-aside">
            <div className=" pb-4">
              <div className="d-flex justify-content-end px-3 pt-2">
                <div class="showall-content">
                  <img class="showall-icon" src={showall} alt="..." />
                  <p class="showall-text">Show all results</p>
                </div>
              </div>
              <ProfessionalAside articles={slicedArticles} />
            </div>
          </div>
          <div className="col-lg-8 professional-preview-section ">
            <ProfessionalMain article={article} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSection;
