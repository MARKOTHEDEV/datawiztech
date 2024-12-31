import React from 'react'
import cancel from "../../assets/images/frame-322-9zy.png";


const getMonthAndDay = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
};

const NotificationMessages = ({pastNotif}) => {
  

  return (
    <div class="notification-box mt-4 mb-5">
    <p class="notification-box-header">Earlier</p>
    {!pastNotif || pastNotif.length === 0 ? (
      <p class="notification-filters-title">You have no new notifications</p>
    ) : (
      pastNotif.map((item, index) => (
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
  )
}

export default NotificationMessages
