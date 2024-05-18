import React, { useEffect, useState } from "react";
import "./PaymentLoader.css";
import PaymentSuccess from "./PaymentSuccess";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";
import { UserAuth } from "../../useContext/useContext";
import PaymentFailed from "./PaymentFailed";

const PaymentLoader = () => {
    const Navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setStatus] = useState(true);
  const { token, setCartLength } = UserAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const tx_ref = urlParams.get("tx_ref");
    const transaction_id = urlParams.get("transaction_id");
  
    if (!status || !tx_ref || !transaction_id) {
      // Redirect back home and toast an error
      window.location.href = "/";
      toast.error("Error: Missing parameters");
      return;
    }
  
    const postData = { status, tx_ref, transaction_id };
  
    try {
      axios
        .post("https://datawiztechapi.onrender.com/api/v1/payment/callback_url", postData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Payment success data sent successfully");
            setLoading(false);
            setStatus(true);
            toast.success("checkout successfully");
            setCartLength(0)
            setTimeout(()=>{
                Navigate("/cart")
            }, 2000)
          } else {
            setLoading(false);
            setStatus(false);
            toast.error("Checkout failed");
          }
        })
        .catch((error) => {
          console.error("Error sending payment success data:", error);
          setLoading(false);
          setStatus(false);
          if (error.response.data) {
            toast.error(error.response.data.message);
          }
        });
    } catch (error) {
      console.error("Error sending payment success data:", error);
      setLoading(false);
      setStatus(false);
      toast.error("An error occurred");
    }
  }, [token, setCartLength]);
  

  return (
    <div
      className="container-fluid d-flex justify-content-center flex-column align-items-center"
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
      ) : paymentStatus ? (
        <PaymentSuccess />
      ) : (
        <PaymentFailed />
      )}
    </div>
  );
};

export default PaymentLoader;
