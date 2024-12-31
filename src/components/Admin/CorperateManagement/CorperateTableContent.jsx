import React, { useState } from "react";
import FetchAllUser from "../../../hooks/FetchUsers";
import DataLoader from "../../../hooks/DataLoader/DataLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { UserAuth } from "../../../useContext/useContext";
import ActionLoader from "../../Loader/ActionLoader";
import nextIcon from "../../../assets/images/icon-color-ZJR.png";
import prevIcon from "../../../assets/images/icon-color-GLh.png";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const CorperateTableContent = ({ search }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [actionStates, setActionStates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const handlePerPageChange = (e) => {
    setCurrentPage(1);
    setDataPerPage(parseInt(e.target.value));
  };
  const { token } = UserAuth();
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const reload = () => {
    window.location.reload();
  };

  const deleteAccount = async (accountId, index) => {
    setLoadingStates((prevStates) => ({
      ...prevStates,
      [`${accountId}-${index}`]: true,
    }));
    try {
      const url = `https://datawiztechapi.onrender.com/api/v1/admin/delete/${accountId}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response && response.status === 200) {
        const data = response.data;
        toast.success(data.message);
      } else {
        toast.error("Error occured !");
      }
    } catch (error) {
      console.error("Error deleting user", error);
      if (error && error.response && error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Failed to delete user. Please try again later !");
      }
    } finally {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [`${accountId}-${index}`]: false,
      }));
    }
  };

  const updateAccountStatus = async (accountId, index, action) => {
    setActionStates((prevStates) => ({
      ...prevStates,
      [`${accountId}-${index}`]: true,
    }));
    try {
      const url = `https://datawiztechapi.onrender.com/api/v1/admin/update-status/${accountId}`;
      const response = await axios.post(
        url,
        { status: action },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response && response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        // setSuccess(true);
        // resetFields();
      } else {
        toast.error("Action failed, try again");
      }
    } catch (error) {
      console.error("Error updating status", error);
      if (error && error.response && error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Failed to update user status. Please try again later !");
      }
    } finally {
      setActionStates((prevStates) => ({
        ...prevStates,
        [`${accountId}-${index}`]: false,
      }));
    }
  };

  const { data, isLoading, error } = FetchAllUser();

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

  if (!data || !data.data || !data.data.users) {
    console.log(data);
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="error-text-section">Users unavailable or empty</div>
          <div className="btn btn-outline-success" onClick={reload}>
            Reload
          </div>
        </div>
      </div>
    );
  }

  const users = data.data.users;
  const filtered = users.filter((item) => {
    return item.role === "Corperate" || item.role === "Subcorperate" ;
  });

  const filteredPartnership = search
    ? filtered.filter((item) => {
        const searchTermLower = search.toLowerCase();
        return (
          // item.title.toLowerCase().includes(searchTermLower) ||
          item.username?.toLowerCase().includes(searchTermLower) ||
          item.email?.toLowerCase().includes(searchTermLower) ||
          item.gender?.toString().toLowerCase().includes(searchTermLower)
        );
      })
    : filtered;

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentPartnership = filteredPartnership.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentPartnership.length !== 0 ? (
        currentPartnership.map((corp, index) => (
          <div className="admin-partnership-body">
            <div className="admin-table-body-widthD">
              <div className="d-flex column-gap-2 align-items-center">
                <div>
                  <img
                    src={corp.image ?? profilepic}
                    alt="profile-pic"
                    className="img-fluid rounded-circle "
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                </div>
                <div className="reverse-transaction">{corp.email}</div>
              </div>
            </div>
            <div className="admin-table-body-widthC">{corp.partnerId}</div>
            <div className="admin-table-body-widthC">
              {formatDate(corp.date)}
            </div>
            <div className="admin-table-body-widthC">
              {formatDate(corp.last_login ?? corp.date)}
            </div>
            <div className="admin-table-body-widthA partnership-author-column">
              <div className="approved-payment">{corp.status}</div>
            </div>
            <div className="admin-table-body-widthC reverse-transaction">
              <div className="approved-payment">{corp.verification}</div>
            </div>
            <div className="admin-table-body-widthB d-flex column-gap-2">
              <div
                className="activate-user"
                onClick={() => {
                  updateAccountStatus(corp._id, `${index}a`, "Active");
                }}
              >
                active
              </div>
              <div
                className="suspend-user"
                onClick={() => {
                  updateAccountStatus(corp._id, `${index}b`, "Suspend");
                }}
              >
                {actionStates[`${corp._id}-${index}`] ? (
                  <ActionLoader />
                ) : (
                  "suspend"
                )}
              </div>
              <div
                className="delete-user"
                onClick={() => {
                  deleteAccount(corp._id, index);
                }}
              >
                {loadingStates[`${corp._id}-${index}`] ? (
                  <ActionLoader />
                ) : (
                  "delete"
                )}
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

      <div className="d-flex align-items-center justify-content-end mt-5">
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

export default CorperateTableContent;
