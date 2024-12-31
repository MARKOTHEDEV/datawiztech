import React from "react";
import CurrentNotification from "./CurrentNotification";
import NotificationMessages from "./NotificationMessages";
import FetchNotifications from "../../hooks/Notifications";
import DataLoader from "../../hooks/DataLoader/DataLoader";

const AllNotification = () => {
  const { data, isLoading, error } = FetchNotifications();
  if (isLoading) {
    return <DataLoader />;
  }
  if (error) {
    return (
      <div>
        <div class="notification-box mt-4 mb-5">
          <p class="notification-box-header">All</p>
          <p class="notification-filters-title">
            You have no new notifications
          </p>
        </div>
      </div>
    );
  }

  const notifications = data.data.notifications;

  let currentNotif = [];
  let pastNotif = [];

  const currentDate = new Date();

  notifications.forEach((notif) => {
    const notifDate = new Date(notif.date);

    if (currentDate.toDateString() === notifDate.toDateString()) {
      currentNotif.push(notif);
    } else {
      pastNotif.push(notif);
    }
  });

  return (
    <div>
      <CurrentNotification currentNotif={currentNotif} />
      <NotificationMessages pastNotif={pastNotif} />
    </div>
  );
};

export default AllNotification;
