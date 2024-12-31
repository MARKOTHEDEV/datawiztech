import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./Messages.css";
import search_icon from "../../assets/images/icon-color-ceD.png";
import MessageAside from "./MessageAside";
import "./MessageMain.css";
import MessageMain from "./MessageMain";
import axios from "axios"


const Messages = () => {
  const [active, setActive] = useState("home")
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  return (
    <div className="message-container">
      <Header active={active} />
      <div className="container">
        <div>
          <nav aria-label="breadcrumb pt-0 mt-0">
            <ol className="breadcrumb pt-0 mt-0">
              <li className="breadcrumb-item pt-0 mt-0">
                <Link to="/" className="bread-items">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item pt-0 mt-0">
                <Link to="/profile" className="bread-items">
                  profile
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link to="#" className="bread-items active">
                  Messages
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 d-lg-block d-none py-3 message-content-aside">
            <div className="message-search-profile mb-3 mx-3">
              {/* <div className="search-eJ5"> */}
              <input
                type="text"
                placeholder="Search..."
                className="message-search-input"
              />
              {/* </div> */}
              <img className="icon-color-mNh" src={search_icon} alt=".." />
            </div>
            <MessageAside  message={message} setMessage={setMessage} image={image} setImage={setImage}/>
          </div>
          <div className="col-lg-9 mx-0 px-0 ">
            <MessageMain  message={message} setMessage={setMessage} image={image} setImage={setImage}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
