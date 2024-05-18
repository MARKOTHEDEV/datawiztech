import React, { useState } from "react";
import RevenueExpenditure from "../../../hooks/RevenueExpenditure";
import DataLoader from "../../../hooks/DataLoader/DataLoader";
import nextIcon from "../../../assets/images/icon-color-ZJR.png";
import prevIcon from "../../../assets/images/icon-color-GLh.png";

const AnalysisTabContent = ({ searchTerm}) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const handlePerPageChange = (e) => {
    setCurrentPage(1); // Reset to first page when changing rows per page
    setDataPerPage(parseInt(e.target.value));
  };

  const { data, isLoading, error } = RevenueExpenditure();

  if (isLoading) {
    // return
    <div className="table-content overflow-x-auto">
      <div className="table-my-revenue">
        <div className="table-headings table-row">
          <div className="table-heading-item table-col-2">Date</div>
          <div className="table-heading-item table-col-4">Indicator name</div>
          <div className="table-heading-item table-col-3">Data type</div>
          <div className="table-heading-item table-col-3">My revenue (N)</div>
        </div>
        <div className="table-body-container">
          <DataLoader />;
        </div>
      </div>
    </div>;
  }

  if (error) {
    return (
      <div className="table-content overflow-x-auto">
        <div className="table-my-revenue">
          <div className="table-headings table-row">
            <div className="table-heading-item table-col-2">Date</div>
            <div className="table-heading-item table-col-4">Indicator name</div>
            <div className="table-heading-item table-col-3">Data type</div>
            <div className="table-heading-item table-col-3">My revenue (N)</div>
          </div>
          <div className="table-body-container">
            <div>
              <div className="empty-pending-friends">
                <div className="card-profile-name">
                  There is no data currently
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.data || !data.data.revenue) {
    return (
      <div className="table-content overflow-x-auto">
        <div className="table-my-revenue">
          <div className="table-headings table-row">
            <div className="table-heading-item table-col-2">Date</div>
            <div className="table-heading-item table-col-4">Indicator name</div>
            <div className="table-heading-item table-col-3">Data type</div>
            <div className="table-heading-item table-col-3">My revenue (N)</div>
          </div>
          <div className="table-body-container">
            <div>
              <div className="empty-pending-friends">
                <div className="card-profile-name">
                  There is no data currently
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.data.revenue.length === 0) {
    return (
      <div className="table-content overflow-x-auto">
        <div className="table-my-revenue">
          <div className="table-headings table-row">
            <div className="table-heading-item table-col-2">Date</div>
            <div className="table-heading-item table-col-4">Indicator name</div>
            <div className="table-heading-item table-col-3">Data type</div>
            <div className="table-heading-item table-col-3">My revenue (N)</div>
          </div>
          <div className="table-body-container">
            <div>
              <div className="empty-pending-friends">
                <div className="card-profile-name">
                  There is no data currently
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const revenue = data.data.revenue;
  const filteredPartnership = searchTerm
    ? revenue.filter((item) => {
        const searchTermLower = searchTerm.toLowerCase();
        return item.product_id.title.toLowerCase().includes(searchTermLower);
        // item.authorId.username?.toLowerCase().includes(searchTermLower) ||
        // item.authorId.email?.toLowerCase().includes(searchTermLower) ||
        // item.authorId.partnerId
        //   ?.toString()
        //   .toLowerCase()
        //   .includes(searchTermLower)
      })
    : revenue;

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentPartnership = filteredPartnership.slice(
    indexOfFirstData,
    indexOfLastData
  );

  // console.log(currentPartnership)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-content overflow-x-auto">
      <div className="table-my-revenue">
        <div className="table-headings table-row">
          <div className="table-heading-item table-col-2">Date</div>
          <div className="table-heading-item table-col-4">Indicator name</div>
          <div className="table-heading-item table-col-3">Data type</div>
          <div className="table-heading-item table-col-3">My revenue (N)</div>
        </div>
        <div className="table-body-container">
          {currentPartnership.length !== 0 ? (
            currentPartnership.map((item, index) => (
              <div className="table-body table-row" key={index}>
                <div className="table-body-items table-col-2">
                  {formatDate(item.created_at)}
                </div>
                <div className="table-body-items table-col-4">
                  {item?.product_id?.title}
                </div>
                <div className="table-body-items table-col-3">
                  {item.product_type}
                </div>
                <div className="table-body-items table-col-3">
                  N {item?.amount?.toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="empty-pending-friends">
                <div className="card-profile-name">
                  There is no data currently
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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

export default AnalysisTabContent;
