import React, { useEffect, useState } from "react";
import "./EmailLoader.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../Header";
import EmailFailed from "./EmailFailed";
import EmailVerified from "./EmailVerified";
import "./EmailVerified.css";

const EmailLoader = () => {
  //   const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setStatus] = useState(true);
  let { email, otp } = useParams();

  useEffect(() => {
    if (!email || !otp) {
      // Redirect back home and toast an error
      window.location.href = "/";
      toast.error("Error: Missing parameters");
      return;
    }
    try {
      axios
        .get(`https://datawiztech.onrender.com/api/v1/verify-email/${email}/${otp}`)
        .then((response) => {
          if (response.status === 200) {
            console.log("Email successfully verified, login your account");
            setLoading(false);
            setStatus(true);
          } else {
            setLoading(false);
            setStatus(false);
            toast.error("Email Verification failed, try again !");
          }
        })
        .catch((error) => {
          console.error("Error occured:", error);
          setLoading(false);
          setStatus(false);
          if (error && error.response && error.response.data) {
            const err = error.response.data;
            toast.error(err.message);
          } else {
            toast.error("Error Occured !");
          }
        });
    } catch (error) {
      console.error("Error sending payment success data:", error);
      setLoading(false);
      setStatus(false);
      if (error && error.response && error.response.data) {
        const err = error.response.data;
        toast.error(err.message);
      } else {
        toast.error("Error Occured !");
      }
    }
  }, [email, otp]);

  return (
    <div>
      <Header />
      <div
        className="container-fluid d-flex justify-content-center p-4 flex-column align-items-center"
        style={{ height: "85vh", width: "100%" }}
      >
        {loading ? (
          <div>
            <div className="font-weight-bolder">Please wait...</div>
            <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
              <circle
                class="pl__ring pl__ring--a"
                cx="120"
                cy="120"
                r="105"
                fill="none"
                stroke="#000"
                stroke-width="20"
                stroke-dasharray="0 660"
                stroke-dashoffset="-330"
                stroke-linecap="round"
              ></circle>
              <circle
                class="pl__ring pl__ring--b"
                cx="120"
                cy="120"
                r="35"
                fill="none"
                stroke="#000"
                stroke-width="20"
                stroke-dasharray="0 220"
                stroke-dashoffset="-110"
                stroke-linecap="round"
              ></circle>
              <circle
                class="pl__ring pl__ring--c"
                cx="85"
                cy="120"
                r="70"
                fill="none"
                stroke="#000"
                stroke-width="20"
                stroke-dasharray="0 440"
                stroke-linecap="round"
              ></circle>
              <circle
                class="pl__ring pl__ring--d"
                cx="155"
                cy="120"
                r="70"
                fill="none"
                stroke="#000"
                stroke-width="20"
                stroke-dasharray="0 440"
                stroke-linecap="round"
              ></circle>
            </svg>
          </div>
        ) : verificationStatus ? (
          <EmailVerified email={email}/>
        ) : (
          <EmailFailed email={email} />
        )}
      </div>
    </div>
  );
};

export default EmailLoader;
