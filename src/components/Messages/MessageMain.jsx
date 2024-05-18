import React, { useState, useEffect, useRef } from "react";
import current from "../../assets/images/ellipse-27-bg-5XF.png";
import attachment from "../../assets/images/attachment.png";
import axios from "axios";
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";
import FetchMessages from "../../hooks/Messages";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import ActionLoader from "../Loader/ActionLoader";
import { useLocation } from "react-router-dom";
import MessageBody from "./MessageBody";
// import socket from "../../components/Messages/MessageMain";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:7001";

const MessageMain = () => {
  const [message, setMessage] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [chat, setChat] = useState(
    JSON.parse(localStorage.getItem("datawizchat")) || null
  );
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("datawizmessages")) || null
  );

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      transports: ["websocket"],
    });
    socket.on("FromAPI", (data) => {
      setMessages(data);
      localStorage.setItem("datawizmessages", JSON.stringify(data));
    });
  });

  console.log(messages);
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chatId = searchParams.get("chat");
  const reload = () => {
    window.location.reload();
  };

  const [image, setImage] = useState("");
  const { token, currentUser } = UserAuth();
  if (!chatId) {
    return (
      <div className="nomessages">
        <div className="message-snip">Select a chat</div>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!chatId) {
      return;
    }

    if (!message && !image) {
      toast.error("You can't send an empty message !");
      return;
    }
    try {
      setMessageLoading(true);
      const response = await axios.post(
        "https://datawiztechapi.onrender.com/api/v1/message",
        {
          receiverId: chatId,
          message: message || "",
          image: image || "",
        },
        {
          headers: { Authorization: token },
        }
      );
      const data = response.data;
      if (data && data.success) {
        const newMessage = {
          receiverId: chat,
          message: message || "",
          image: image || "",
          senderId: currentUser._id,
          date: new Date(),
        };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        localStorage.setItem(
          "datawizmessages",
          JSON.stringify(updatedMessages)
        );

        toast.success("Message sent!");
        setMessage("");
        setImage("");
        // socket.emit("chat message", "Hello, world!");
      } else {
        toast.error("Failed to send");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setMessageLoading(false);
    }
  };

  if (!messages) {
    return (
      <div>
        <div className="message-main-heading">
          <div className="message-main-profile">
            <div className="message-main-pic-container">
              <img
                src={!chat?.image ? profilepic : chat.image}
                alt=".."
                className="message-main-pic"
              />
            </div>
            <div className="message-main-name">
              {chat?.first_name ?? ""} {chat?.last_name ?? ""}
            </div>
          </div>
          <div className="message-main-type">{chat?.occupation ?? ""}</div>
        </div>
        <div className="message-inner position-relative">
          <div className="message-sender">
            <div className="type-form">
              <div className="send-message-container">
                <input
                  type="text"
                  className="send-message-input "
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <input
                  type="file"
                  className="d-none"
                  id="attachment"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="attachment">
                  <img src={attachment} alt=".." className="attachment-icon" />
                </label>
              </div>
              <div
                className={`send-messages ${
                  messageLoading
                    ? "d-flex justify-content-center  align-items-center"
                    : "text-center"
                }`}
                onClick={sendMessage}
              >
                {messageLoading ? <ActionLoader /> : "Send"}
              </div>
            </div>
            <div className="message-inner-content">
              <div className="empty-pending-friends">
                <div className="error-text-section">You have no message</div>
                <div className="btn btn-outline-success" onClick={reload}>
                  Reload
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentChant = messages.filter((item) => {
    const isCurrentUserSender = item.senderId && String(item.senderId._id) === currentUser._id;
    const isChatUserReceiver = item.receiverId && String(item.receiverId._id) === chatId;
    const isCurrentUserReceiver = item.receiverId && String(item.receiverId._id) === currentUser._id;
    const isChatUserSender = item.senderId && String(item.senderId._id) === chatId;
  
    return (isCurrentUserSender && isChatUserReceiver) || (isCurrentUserReceiver && isChatUserSender);
  });
  
  

  return (
    <div>
      {currentChant.length === 0 ? (
        <div>
          <div className="message-main-heading">
            <div className="message-main-profile">
              <div className="message-main-pic-container">
                <img
                  src={!chat?.image ? profilepic : chat.image}
                  alt=".."
                  className="message-main-pic"
                />
              </div>
              <div className="message-main-name">
                {chat?.first_name ?? ""} {chat?.last_name ?? ""}
              </div>
            </div>
            <div className="message-main-type">{chat?.occupation ?? ""}</div>
          </div>
          <div className="message-inner position-relative">
            <div className="message-sender">
              <div className="type-form">
                <div className="send-message-container">
                  <input
                    type="text"
                    className="send-message-input "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <input
                    type="file"
                    className="d-none"
                    id="attachment"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <label htmlFor="attachment">
                    <img
                      src={attachment}
                      alt=".."
                      className="attachment-icon"
                    />
                  </label>
                </div>
                <div
                  className={`send-messages ${
                    messageLoading
                      ? "d-flex justify-content-center  align-items-center"
                      : "text-center"
                  }`}
                  onClick={sendMessage}
                >
                  {messageLoading ? <ActionLoader /> : "Send"}
                </div>
              </div>
              <div className="message-inner-content">
                <div className="messages-info d-flex align-items-center justify-content-center h-100">
                  <div>No message at the moment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="message-main-heading">
            <div className="message-main-profile">
              <div className="message-main-pic-container">
                <img
                  src={!chat?.image ? profilepic : chat.image}
                  alt=".."
                  className="message-main-pic"
                />
              </div>
              <div className="message-main-name">
                {chat?.first_name ?? ""} {chat?.last_name ?? ""}
              </div>
            </div>
            <div className="message-main-type">{chat?.occupation ?? ""}</div>
          </div>
          <div className="message-inner position-relative">
            <div className="message-sender">
              <div className="type-form">
                <div className="send-message-container">
                  <input
                    type="text"
                    className="send-message-input "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <input
                    type="file"
                    className="d-none"
                    id="attachment"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <label htmlFor="attachment">
                    <img
                      src={attachment}
                      alt=".."
                      className="attachment-icon"
                    />
                  </label>
                </div>
                <div className="send-messages" onClick={sendMessage}>
                  Send
                </div>
              </div>
              <MessageBody
                chat={chat}
                messages={currentChant}
                // currentChant={currentChant}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageMain;
