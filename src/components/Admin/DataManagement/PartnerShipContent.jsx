import React from "react";
import FetchPartnerdhip from "../../../hooks/FetchPartnership";
import authorpic from "../../../assets/images/ellipse-29-bg.png";
import DataLoader from "../../../hooks/DataLoader/DataLoader";

const PartnerShipContent = ({ searchTerm }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const { data, isLoading, error } = FetchPartnerdhip();

  if (isLoading) {
    return <DataLoader active={true} />;
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

  const partnership = data.data.data;
  console.log(partnership);
  if (partnership.length === 0) {
    return (
      <div>
        <div className="empty-pending-friends">
          <div className="card-profile-name">Partnership is empty</div>
        </div>
      </div>
    );
  }

  const filteredPartnership = searchTerm
    ? partnership.filter((item) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchTermLower) ||
          item.authorId.username?.toLowerCase().includes(searchTermLower) ||
          item.authorId.email?.toLowerCase().includes(searchTermLower) ||
          item.authorId.partnerId
            ?.toString()
            .toLowerCase()
            .includes(searchTermLower)
        );
      })
    : partnership;

  return (
    <div className="admin-partnership-table-container">
      <div className="adminpartnershiptable">
        <div className="admin-partnership-heading">
          <div className="admin-table-widthA">Date</div>
          <div className="admin-table-widthA">Partnership ID</div>
          <div className="admin-table-widthD">Author's Username</div>
          <div className="admin-table-widthB">Indicator name</div>
          <div className="admin-table-widthA">Co-author(s)</div>
          <div className="admin-table-widthC">Gentd. Amt. (N)</div>
        </div>
        {filteredPartnership.map((item, index) => (
          <div className="admin-partnership-body">
            <div className="admin-table-body-widthA">
              {formatDate(item.date)}
            </div>
            <div className="admin-table-body-widthA">
              {item.authorId.partnerId}
            </div>
            <div className="admin-table-body-widthD">
              {item.authorId.username ?? item.authorId.email}
            </div>
            <div className="admin-table-body-widthB">{item.title}</div>
            <div className="admin-table-body-widthA partnership-author-column">
              {item.partnership.map((partner, index) => (
                <img
                  className="admin-partnership-author"
                  src={partner.partnerId.image ?? profilepic}
                  alt="..."
                />
              ))}
            </div>
            <div className="admin-table-body-widthC">
              {item.generatedAmount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerShipContent;
