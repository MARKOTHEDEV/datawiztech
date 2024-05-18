import React, { useState } from "react";
import current from "../../assets/images/ellipse-27-bg-5XF.png";
import attachment from "../../assets/images/attachment.png";
import axios from "axios";
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";
import FetchMessages from "../../hooks/Messages";
import DataLoader from "../../hooks/DataLoader/DataLoader";
import ActionLoader from "../Loader/ActionLoader";
import { useLocation } from "react-router-dom";

const MessageMain = () => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chatId = searchParams.get("chat");
  const [message, setMessage] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [chat, setChat] = useState(
    JSON.parse(localStorage.getItem("datawizchat")) || null
  );
  const [image, setImage] = useState("");
  // const { data, isLoading, error } = FetchMessages();
  const { token, messages } = UserAuth();

  const sendMessage = async () => {
    if (!chatId) {
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
        toast.success("Message sent!");
        setMessage("");
        setImage("");
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

  // if (isLoading) {
  //   return <DataLoader active={"active"} />;
  // }

  console.log(messages)

  if (!chatId) {
    return (
      <div className="nomessages">
        <div>No message at the moment</div>
      </div>
    );
  }


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
              <div className="messages-info d-flex align-items-center justify-content-center h-100">
                <div>No message at the moment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // const messages = data.messages;

  return (
    <div>
      {messages.messages.length === 0 ? (
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
              <div className="message-inner-content">
                <div className="messages-info">
                  {messages.messages.map((item, index) => (
                    <div key={index}>
                      {item.receiverId._id.toString() !==
                      chat._id.toString() ? (
                        <div className="incoming-message d-flex justify-content-start pt-3">
                          <div className="receiver-messages">
                            <div className="message-main-profile">
                              <div className="message-main-pic-container">
                                <img
                                  src={profilepic}
                                  alt=".."
                                  className="message-main-pic"
                                />
                              </div>
                              <div className="message-main-name-text">
                                Oluwajane Ademidoe
                              </div>
                            </div>
                            <div className="incoming-message-text pt-2">
                              Hello Anu. Thank you for reaching out. How may I
                              help you?
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="incoming-message d-flex justify-content-end pt-3">
                          <div className="receiver-messages">
                            <div className="message-main-profile">
                              <div className="message-main-pic-container">
                                <img
                                  src={profilepic}
                                  alt=".."
                                  className="message-main-pic"
                                />
                              </div>
                              <div className="message-main-name-text">
                                Oluwajane Ademidoe
                              </div>
                            </div>
                            <div className="incoming-message-text pt-2">
                              Hello Anu. Thank you for reaching out. How may I
                              help you?
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageMain;
