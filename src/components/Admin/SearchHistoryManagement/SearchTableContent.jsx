import React, { useState } from "react";
import DataLoader from "../../../hooks/DataLoader/DataLoader";
import FetchSearchTerms from "../../../hooks/SearchTerms";
import nextIcon from "../../../assets/images/icon-color-ZJR.png";
import prevIcon from "../../../assets/images/icon-color-GLh.png";

const SearchTableContent = ({ searchTerm }) => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const reload = () => {
    window.location.reload();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const handlePerPageChange = (e) => {
    setCurrentPage(1); // Reset to first page when changing rows per page
    setDataPerPage(parseInt(e.target.value));
  };

  const { data, isLoading, error } = FetchSearchTerms();

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    console.log(error.message);
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="error-text-section">Error Occured</div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.data || !data.data.search) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="error-text-section">Search unavailable or empty</div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  const search = data.data.search;
  const filteredPartnership = searchTerm
    ? search.filter((item) =>
        item.searchterm.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : search;

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentPartnership = filteredPartnership.slice(
    indexOfFirstData,
    indexOfLastData
  );

  // console.log(currentPartnership)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      {currentPartnership.length !== 0 ? (
        currentPartnership.map((item, index) => (
          <div className="admin-search-history-body" key={index}>
            <div className="admin-search-user-body">{item.searchterm}</div>
            <div className="admin-search-count-body">{item.search_count}</div>
            <div className="admin-search-body">
              <div className="admin-search-body-content">
                <img
                  src={
                    !item.user_id
                      ? profilepic
                      : item.user_id[0]?.image || profilepic
                  }
                  alt=""
                  className="admincountpic"
                />
                <div className="admin-search-body-number">
                  {(item.user_id && item.user_id.length) ?? 0}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="empty-pending-friends">
            <div className="card-profile-name">There is no data currently</div>
          </div>
        </div>
      )}

      <div className="d-flex align-items-center justify-content-end">
        <div className="pagination-tablet column-gap-4">
          <div className="row-per-page">Rows per page:</div>
          <div className="auto-group-pand-Eru">
            <div className="auto-group-8hsw-kaM">
              <select className="form-control" onChange={handlePerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="d-flex column-gap-4">
            <div className="pagenumbers">
              {indexOfFirstData + 1}-
              {Math.min(indexOfLastData, filteredPartnership.length)} of{" "}
              {filteredPartnership.length}
            </div>
            {indexOfFirstData + 1 !== 1 ? (
              <img
                className="icon-color-QoK"
                src={nextIcon}
                alt="previous"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
            ) : (
              ""
            )}
            {Math.min(indexOfLastData, filteredPartnership.length) !==
            filteredPartnership.length ? (
              <img
                className="icon-color-jqb"
                src={prevIcon}
                alt="next"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastData >= filteredPartnership.length}
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

export default SearchTableContent;
