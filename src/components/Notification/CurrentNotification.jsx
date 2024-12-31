import cancel from "../../assets/images/frame-322-9zy.png";
import React from "react";


const getMonthAndDay = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
};

const CurrentNotification = ({ currentNotif }) => {
  return (
    <div class="notification-box my-4">
      <p class="notification-box-header">Today</p>
      {!currentNotif || currentNotif.length === 0 ? (
        <p class="notification-filters-title">You have no new notifications</p>
      ) : (
        currentNotif.map((item, index) => (
          <div class="notification-content py-3">
            <div class="notification-content-message">
              {item.message}
            </div>
            <div class="notification-content-action">
              <div class="notification-content-message">{getMonthAndDay(item.date)}</div>
              <div>
                <img
                  class="notification-content-cancel"
                  src={cancel}
                  alt=".."
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CurrentNotification;
