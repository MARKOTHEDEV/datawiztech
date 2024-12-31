import React, { useEffect, useRef } from "react";

const MessageBody = ({ messages, chat }) => {
  const profilepic =
    "https://firebasestorage.googleapis.com/v0/b/datawiztech-9a46a.appspot.com/o/profilepic%2Fprofile-circle.png?alt=media&token=ec19eaec-b6f7-472d-8fc4-affdbd330f78";
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  

  return (
    <div className="message-inner-content">
      <div className="messages-info mb-5">
        {messages.map((item, index) => (
          <div key={index}>
            {item.receiverId._id.toString() !== chat._id.toString() ? (
              <div className="incoming-message d-flex justify-content-start pt-3">
                <div className="receiver-messages">
                  <div className="message-main-profile">
                    <div className="message-main-pic-container">
                      <img
                        src={!chat?.image ? profilepic : chat.image}
                        alt=".."
                        className="message-main-pic"
                      />
                    </div>
                    <div className="message-main-name-text">
                      {chat?.first_name ?? ""} {chat?.last_name ?? ""}
                    </div>
                  </div>
                  <div className="incoming-message-text pt-2">
                    {item.message}
                  </div>
                </div>
              </div>
            ) : (
              <div className="incoming-message d-flex justify-content-end pt-3">
                <div className="receiver-messages">
                  <div className="message-main-profile">
                    <div className="message-main-name-text">You</div>
                  </div>
                  <div className="incoming-message-text pt-2">
                    {item.message}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default MessageBody;
