import React, { useState } from "react";
import { UserAuth } from "../../../useContext/useContext";
import DataLoader from "../../../hooks/DataLoader/DataLoader";
import FetchPartnership from "../../../hooks/FetchPartnership";
import nextIcon from "../../../assets/images/icon-color-ZJR.png";
import prevIcon from "../../../assets/images/icon-color-GLh.png";

// import authorpic from "../../../assets/images/ellipse-27-bg-vtZ.png";

const RevenueTab = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const handlePerPageChange = (e) => {
    setCurrentPage(1); // Reset to first page when changing rows per page
    setDataPerPage(parseInt(e.target.value));
  };

  const { currentUser } = UserAuth();
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substr(0, maxLength)}...`;
  };

  const { data, isLoading, error } = FetchPartnership();

  if (isLoading) {
    return <DataLoader />;
  }

  if (error) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">There is no data currently</div>
        </div>
      </div>
    );
  }

  if (!data || !data.data || !data.data.data) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">There is no data currently</div>
        </div>
      </div>
    );
  }

  const analysis = data.data.data;
  const filteredAnalysis = analysis.filter((data) => {
    if (String(data.authorId._id) === String(currentUser._id)) {
      return true;
    }
    if (
      Array.isArray(data.partnership) &&
      data.partnership.some(
        (partner) => String(partner.partnerId._id) === String(currentUser._id)
      )
    ) {
      return true;
    }

    return false;
  });

  const filteredPartnership = searchTerm
    ? filteredAnalysis.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.product.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredAnalysis;

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentPartnership = filteredPartnership.slice(
    indexOfFirstData,
    indexOfLastData
  );

  // console.log(currentPartnership)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log(filteredAnalysis);

  const currentUserPartnershipType = currentPartnership.map((item) => {
    const partnershipTypeObj = item.partnership.find(
      (partner) => String(partner.partnerId._id) === String(currentUser._id)
    );
    return partnershipTypeObj ? partnershipTypeObj.role : "";
  });

  return (
    <div className="row mt-4">
      <div className="col-lg-8">
        <div className="table-content revenuetab overflow-x-auto">
          <div className={`table-my-revenue`}>
            <div class="table-headings table-row">
              <div class="table-heading-item table-col-4">Indicator name</div>
              <div class="table-heading-item table-col-2">Data type</div>
              <div class="table-heading-item table-col-3">Gentd. Amt (N)</div>
              <div class="table-heading-item table-col-3">Partnership type</div>
            </div>
            <div className="table-body-container">
              {currentPartnership.length !== 0 ? (
                currentPartnership.map((item, index) => (
                  <div class="table-body table-row" key={index}>
                    <div class="table-body-items table-col-4">
                      {truncateText(item.title, 20)}
                    </div>
                    <div class="table-body-items table-col-2">
                      {item.product}
                    </div>
                    <div class="table-body-items table-col-3">
                      {item.generatedAmount.toLocaleString()}
                    </div>
                    <div class="table-body-items table-col-3">
                    {currentUserPartnershipType[index]}
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

export default RevenueTab;
