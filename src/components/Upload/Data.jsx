import React, { useState } from "react";
import nextIcon from "../../assets/images/icon-color-ZJR.png";
import prevIcon from "../../assets/images/icon-color-GLh.png";
import { Link } from "react-router-dom";
import searchCardPic from "../../assets/images/ellipse-27-bg-Sf3.png";
import like from "../../assets/images/icons8-facebook-like-4qo.png";
import download from "../../assets/images/icons8-download-from-the-cloud-dqs.png";
import share from "../../assets/images/icons8-forward-arrow-100-2-F53.png";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import FetchData from "../../hooks/FetchDatas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCartDataApi, getDataApi } from "../../api/data.api";

const Data = ({ search }) => {
  const reload = () => {
    window.location.reload();
  };
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(15);
  // const { data, isLoading, error } = FetchData();
  // const isLoading=false
  // const data =[];
  const error= null
  // const currentDatas =[]

  const {isLoading,data} = useQuery({
    queryKey:'getDataApi',
    queryFn:getDataApi,
    refetchInterval:false,
    refetchOnWindowFocus:false
  })

  const {} = useMutation({
    mutationFn:addToCartDataApi,
  })

  if (isLoading) {
    return <DataLoader />;
  }
  if (error) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="error-text-section">You have not posted any data</div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="row mt-2 mb-4">
        {/* {currentDatas.length !== 0 ? (
          currentDatas.map((item, index) => ( */}
        {data?.length !== 0 ? (
          data?.map((item, index) => (
            <div className="col-lg-4 my-2">
              <div className="upload-result-card">
                <Link
                to={'#'}
                // to={`/search/data/result/${item.id}`}
                >
                  <div className="upload-card-title pb-3">{item.title}</div>
                  <div class="search-card-profile">
                    <div class="search-card-flex">
                      <div class="search-card-pic-container">
                        <div class="upload-card-pic">
                          <img
                            src={profilepic}
                            alt=".."
                            className="img-fluid upload-card-pic"
                          />
                        </div>
                      </div>
                      <div class="search-card-name">
                        {item.author_name} 
                      </div>
                    </div>
                    {/* <div class="data-verified">
                      {item.authorId?.verification === "verified"
                        ? "verified"
                        : "unverified"}
                    </div> */}
                  </div>
                  <div className="search-card-location-content py-3">
                    <div>
                      {item.price === 0 || !item.price
                        ? "free"
                        : "#" + item.price}
                    </div>
                    <div className="search-card-location">
                      {item.periodicity}
                    </div>
                  </div>

                  <div class="search-card-icon-part pb-3">
                    <div class="search-card-icon-container">
                      <div class="search-card-count">{item.no_likes}</div>
                      <img class="search-card-count-icon" src={like} alt=".." />
                    </div>
                    {/* <div class="search-card-icon-container">
                      <div class="search-card-count">{item.share}</div>
                      <img
                        class="search-card-count-icon"
                        src={download}
                        alt=".."
                      />
                    </div> */}
                                          {/* <button className="data-filter-btn p-2" style={{'border':'1px solid transparent'}}>
                        Add to cart
                      </button> */}
                    <div class="search-card-icon-container">
                      <div class="search-card-count" style={{'display':'flex'}}>
                        <img class="search-card-count-icon" src={download} alt=".." />
                        <p>{item.no_downloads}</p>
                      </div>
                      {/* <img
                        class="search-card-count-icon"
                        src={share}
                        alt=".."
                      /> */}

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
                Data not found
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="d-flex  align-items-center justify-content-end">
        <div class="pagination-tablet column-gap-4">
          <div class="row-per-page">Rows per page:</div>
          <div class="auto-group-pand-Eru">
            <div class="auto-group-8hsw-kaM">
              <select
                className="form-control"
                // onChange={(e) => setDataPerPage(parseInt(e.target.value))}
              >
                <option>3</option>
                <option>5</option>
                <option>7</option>
                <option>10</option>
              </select>
            </div>
          </div>
          <div className="d-flex column-gap-4">
            <div class="pagenumbers">
              {indexOfFirstData + 1}-{Math.min(indexOfLastData, datas.length)}{" "}
              of {datas.length}
            </div>
            {indexOfFirstData + 1 !== 1 ? (
              <img
                class="icon-color-QoK"
                src={nextIcon}
                alt="previous"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastData >= datas.length}
              />
            ) : (
              ""
            )}
            {Math.min(indexOfLastData, datas.length) !== datas.length ? (
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
      </div> */}
    </div>
  );
};

export default Data;
