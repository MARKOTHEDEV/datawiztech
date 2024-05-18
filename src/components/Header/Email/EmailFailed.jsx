import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast"

const EmailFailed = ({email}) => {
  const [btnLoading, setBtnLoading] = useState(false)

  const resendLink = async()=>{
    try {
      const response = await axios.get(`https://datawiztech.onrender.com/verify/${email}`)
      if(response.status === 200){
        const data = response.data
        toast.success(data.message)
      }else{
        toast.error("Error Occured !")
      }
    } catch (err) {
      console.log(err)
      if(err && err.response && err.response.data){
        toast.error(err.response.data.message)
      }else{
        toast.error("Error occured !")
      }
    }
  }

  return (
    <div className="email-card">
      <button className="email-dismiss" type="button">
        ×
      </button>
      <div className="email-header">
        <Link to="/" className="email-image-failed">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </Link>
        <div className="email-content">
          <span className="email-title-failed">Email verification failed</span>
          <p className="email-message">
            {" "}
            Email verification failed, might be a network issue or link expired
            !
          </p>
        </div>
        <div className="email-actions">
          <button className="email-history-failed" type="button">
            Try Again
          </button>
          <button className="email-track" type="button">
            <Link to="/">Go Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailFailed;
