import React, { useEffect, useState, useCallback } from "react";
// import searchCardPic from "../../assets/images/ellipse-27-bg-Sf3.png";
import FetchFriends from "../../hooks/Friends";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import { Link, useLocation } from "react-router-dom";
import FetchAllMessages from "../../hooks/AllMessages";
import { UserAuth } from "../../useContext/useContext";
import FetchDetails from "../../hooks/FetchDetails";

const MessageAside = () => {
  const { currentUser } = UserAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chatId = searchParams.get("chat");
  // const [chat, setChat] = useState({});
  const showChat = (currentChat) => {
    localStorage.setItem("datawizchat", JSON.stringify(currentChat));
  };
  // const [lastMessages, setLastMessages] = useState({});
  // const [messages, setMessages] = useState(
  //   JSON.parse(localStorage.getItem("datawizmessages")) || null
  // );

  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const { data, isLoading, error } = FetchDetails();
  console.log({profilepic})

  if (isLoading) {
    return <DataLoader />;
  }


  if (error || !data || !data.data || !data.data.user.friends) {
    return <div className="messages-box-wrapper active">
      <div className="messages-box px-3 pt-4">
        <div className="each-message-profile">
          <div class="message-snip pt-2">You have no active friend</div>
        </div>
      </div>
    </div>;
  }

  let friends = data.data.user.friends;
  // const friends = allFriend.filter((item) => {
  //   return item.status === "approved" || item.status === "chat";
  // });



  return (
    <div className="messages-box-wrapper active">
      <div className="messages-box px-3 pt-4">
        {friends.map((item, index) => (
          <Link
            Link
            to={`https://datawiztech.onrender.com/profile/messages?chat=${item.friend._id}`}
            key={index}
            onClick={(e) => {
              e.preventDefault();
              showChat(item.friend);
              window.location.href = `https://datawiztech.onrender.com/profile/messages?chat=${item.friend._id}`; 
            }}
          >
            <div
              className={`each-message-profile ${
                chatId && chatId.toString() === item.friend._id
                  ? "active"
                  : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="message-profile">
                  <div class="message-card-pic-container">
                    <div class="message-card-pic">
                      <img
                        src={item.friend.image ?? profilepic}
                        alt=".."
                        className="img-fluid message-card-pic"
                      />
                    </div>
                    <div class="message-card-pic-num">5</div>
                  </div>
                  <div class="message-name">
                    {item.friend?.first_name} {item.friend?.last_name}
                  </div>
                </div>
                <div className="message-time">9:45</div>
              </div>
              <div class="message-snip pt-2">
                {/* {renderLastMessages(item.friend?._id)} */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessageAside;
